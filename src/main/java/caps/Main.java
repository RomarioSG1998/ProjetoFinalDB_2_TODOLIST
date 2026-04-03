package caps;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class Main {
    private final Passando_metodos repo;

    public Main(Passando_metodos repo){
        this.repo = repo;
    }

    @PostMapping("/task")
    public Tasks salvar(@RequestBody Tasks task){
        return repo.save(task);
    }

    @GetMapping("/task")
    public List<Tasks> listar(){
        return repo.findAll();
    }

    @DeleteMapping("/task/{id}")
    public String excluir(@PathVariable Long id){
        if(repo.existsById(id)){
            repo.deleteById(id);
            return "A task "+id+" Foi removida";
        }
        else{
            return "A task "+id+" não conseguiu ser removida";
        }
    }
}
