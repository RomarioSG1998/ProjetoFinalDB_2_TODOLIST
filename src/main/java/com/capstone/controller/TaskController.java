package com.capstone.controller;

import com.capstone.model.Task;
import com.capstone.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {
    
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping("/task")
    public Task salvar(@RequestBody Task task) {
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
}
