package com.capstone.validation;

import com.capstone.model.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskValidator {

    public void validateForSave(Task task) {
        if (task.getNome() == null || task.getNome().isBlank()) {
            throw new IllegalArgumentException("O nome da tarefa não pode estar vazio!");
        }

        if (task.getDescricao() == null || task.getDescricao().isBlank()) {
            throw new IllegalArgumentException("A descrição da tarefa não pode estar vazia!");
        }

        if (task.getImportancia() == null || task.getImportancia().isBlank()) {
            throw new IllegalArgumentException("A importância da tarefa deve ser informada!");
        }
    }
}
