#!/bin/bash
# Script de Deploy Automático para Killercoda / Vcluster
# Este script cria todos os manifestos K8s com as correções de CORS e URLs relativas.

mkdir -p k8s

cat <<EOF > k8s/deploy-automatico.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: capstone-config
data:
  DB_HOST: "postgres"
  DB_PORT: "5432"
  DB_NAME: "capstone"
  SPRING_DATASOURCE_USERNAME: "postgres"
  SPRING_DATASOURCE_PASSWORD: "postgres"
  VITE_API_URL: ""
  ALLOWED_ORIGINS: "*"
---
apiVersion: v1
kind: Secret
metadata:
  name: ghcr-pull-secret
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: ewoJImF1dGhzIjogewoJCSJnaGNyLmlvIjogewoJCQkiYXV0aCI6ICJVbTl0WVhKcGIxTkhNVGs1T0RwbmFIQmZiRk0xV1ZGeGREUk5Rbms1UkVjd1lrWnlXRUl4ZUhOWWVtUkdSVzFXTkdKSFZ6ZG8iCgkJfQoJfQp9
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes: ["ReadWriteOnce"]
  resources:
    requests:
      storage: 1Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_DB
          valueFrom:
            configMapKeyRef:
              name: capstone-config
              key: DB_NAME
        - name: POSTGRES_USER
          valueFrom:
            configMapKeyRef:
              name: capstone-config
              key: SPRING_DATASOURCE_USERNAME
        - name: POSTGRES_PASSWORD
          valueFrom:
            configMapKeyRef:
              name: capstone-config
              key: SPRING_DATASOURCE_PASSWORD
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      imagePullSecrets:
      - name: ghcr-pull-secret
      containers:
      - name: backend
        image: ghcr.io/romariosg1998/todolist-backend:latest
        imagePullPolicy: Always
        envFrom:
        - configMapRef:
            name: capstone-config
        ports:
        - containerPort: 8081
---
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
  - port: 8081
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  default.conf: |
    server {
        listen 80;
        location / {
            root /usr/share/nginx/html;
            try_files \$uri \$uri/ /index.html;
        }
        location /api/ {
            proxy_pass http://backend:8081/api/;
        }
    }
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      imagePullSecrets:
      - name: ghcr-pull-secret
      containers:
      - name: frontend
        image: ghcr.io/romariosg1998/todolist-frontend:latest
        imagePullPolicy: Always
        envFrom:
        - configMapRef:
            name: capstone-config
        volumeMounts:
        - name: nginx-conf
          mountPath: /etc/nginx/conf.d/default.conf
          subPath: default.conf
      volumes:
      - name: nginx-conf
        configMap:
          name: nginx-config
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - port: 80
    nodePort: 30000
EOF

kubectl apply -f k8s/deploy-automatico.yaml
echo "Deploy concluído! Use 'kubectl get pods -w' para acompanhar."
