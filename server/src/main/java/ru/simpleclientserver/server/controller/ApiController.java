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
@RequestMapping("api")
public class ApiController {

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        log.info("Пользователь с email {} записан в БД", user.getEmail());
        return usersRepository.save(user);
    }

    @GetMapping("/get/all")
    public List<User> getUsers() {
        log.info("Получены все пользователи");
        return usersRepository.findAll();
    }

    @GetMapping("/get")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) throws ResourceNotFoundException {
        User user = usersRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Пользователь с таким email не найден"));
        log.info("Получен пользователь {}", email);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestParam String email,
                                           @RequestBody User updateDetails) throws ResourceNotFoundException {
        User user = usersRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Пользователь с таким email не найден"));

        Optional.ofNullable(updateDetails.getFirstName()).ifPresent(user::setFirstName);
        Optional.ofNullable(updateDetails.getLastName()).ifPresent(user::setLastName);
        Optional.ofNullable(updateDetails.getEmail()).ifPresent(user::setEmail);
        log.info("Пользователь обновлен");
        return ResponseEntity.ok(usersRepository.save(user));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String email) throws ResourceNotFoundException {
        User user = usersRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Пользователь с таким email не найден"));
        log.info("Пользователь удален");
        usersRepository.delete(user);
        return ResponseEntity.ok(String.format("Пользователь %s удален", email));
    }
}
