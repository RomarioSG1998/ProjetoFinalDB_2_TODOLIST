package com.capstone.controller;

import com.capstone.model.Task;
import com.capstone.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {
    
    private final TaskRepository taskRepository;
    private final com.capstone.validation.TaskValidator taskValidator;

    public TaskController(TaskRepository taskRepository, com.capstone.validation.TaskValidator taskValidator) {
        this.taskRepository = taskRepository;
        this.taskValidator = taskValidator;
    }

    @PostMapping("/task")
    public Task salvar(@RequestBody Task task) {
        taskValidator.validateForSave(task);
        return taskRepository.save(task);
    }

    @GetMapping("/task")
    public List<Task> listar() {
        return taskRepository.findAll();
    }

    @DeleteMapping("/task/{id}")
    public String excluir(@PathVariable Long id) {
        if(taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return "A task " + id + " foi removida";
        } else {
            return "A task " + id + " não conseguiu ser removida! ID incorreto.";
        }
    }

    @GetMapping("/task/{id}")
    public Task buscarPorId(@PathVariable Long id){
        return taskRepository.findById(id).orElse(null);
    }

    @PutMapping("/task/{id}")
    public Task atualizar(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id).map(task -> {
            
            task.setNome(taskDetails.getNome());
            task.setDescricao(taskDetails.getDescricao());
            task.setImportancia(taskDetails.getImportancia());
            taskValidator.validateForSave(task);
 
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada com o id: " + id));
    }
}