package com.example.mindbuilderbackend.controller;

import com.example.mindbuilderbackend.dto.IQGameDTO;
import com.example.mindbuilderbackend.dto.IQGameResponseDTO;
import com.example.mindbuilderbackend.service.IQGameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/iq-games")
@CrossOrigin("*")
public class IQGameController {

    private final IQGameService iqGameService;

    public IQGameController(IQGameService iqGameService) {
        this.iqGameService = iqGameService;
    }

    @PostMapping
    public ResponseEntity<IQGameResponseDTO> createGame(@RequestBody IQGameDTO gameDTO) {
        IQGameResponseDTO responseDTO = iqGameService.createGame(gameDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IQGameResponseDTO> getGameById(@PathVariable Long id) {
        IQGameResponseDTO responseDTO = iqGameService.getGameById(id);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<IQGameResponseDTO>> getAllGames() {
        List<IQGameResponseDTO> games = iqGameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<IQGameResponseDTO>> getGamesByTeacher(@PathVariable Long teacherId) {
        List<IQGameResponseDTO> games = iqGameService.getGamesByTeacher(teacherId);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/difficulty/{level}")
    public ResponseEntity<List<IQGameResponseDTO>> getGamesByDifficulty(@PathVariable String level) {
        List<IQGameResponseDTO> games = iqGameService.getGamesByDifficulty(level);
        return ResponseEntity.ok(games);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IQGameResponseDTO> updateGame(@PathVariable Long id, @RequestBody IQGameDTO gameDTO) {
        IQGameResponseDTO responseDTO = iqGameService.updateGame(id, gameDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        iqGameService.deleteGame(id);
        return ResponseEntity.noContent().build();
    }
}
