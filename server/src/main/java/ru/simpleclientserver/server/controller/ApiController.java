package ru.simpleclientserver.server.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.simpleclientserver.server.exception.ResourceNotFoundException;
import ru.simpleclientserver.server.model.User;
import ru.simpleclientserver.server.repository.UsersRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("api")
public class ApiController {

    @Autowired
    private UsersRepository usersRepository;

//    @CrossOrigin("http://localhost:3000")
    @PostMapping(value = "/create")
    public User createUser(@RequestBody User user) {
        log.info("Пользователь с email {} записан в БД", user.getEmail());
        return usersRepository.save(user);
    }

    @GetMapping("/get")
    public List<User> getUsers() {
        log.info("Получены все пользователи");
        return usersRepository.findAll();
    }

    @GetMapping("/getuser")
    public User getUserByEmail(@RequestParam String email) throws ResourceNotFoundException {
        User user = usersRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Пользователь с таким email не найден"));
        log.info("Получен пользователь {}", email);
        return user;
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestParam Long id,
                                           @RequestBody User updateDetails) throws ResourceNotFoundException {
        User user = usersRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Пользователь с таким идентификатором не найден"));

        Optional.ofNullable(updateDetails.getFirstName()).ifPresent(user::setFirstName);
        Optional.ofNullable(updateDetails.getLastName()).ifPresent(user::setLastName);
        Optional.ofNullable(updateDetails.getEmail()).ifPresent(user::setEmail);
        log.info("Пользователь c идентификатором {} обновлен", id);
        return ResponseEntity.ok(usersRepository.save(user));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam Long id) throws ResourceNotFoundException {
        User user = usersRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Пользователь с таким идентификатором не найден"));
        log.info("Пользователь с идентификатором {} удален", id);
        usersRepository.delete(user);
        return ResponseEntity.ok(String.format("Пользователь с идентификатором %s удален", id));
    }
}
