package com.example.mindbuilderbackend.service;

import com.example.mindbuilderbackend.dto.IQGameDTO;
import com.example.mindbuilderbackend.dto.IQGameResponseDTO;
import com.example.mindbuilderbackend.exception.ResourceNotFoundException;
import com.example.mindbuilderbackend.model.IQGame;
import com.example.mindbuilderbackend.model.Teacher;
import com.example.mindbuilderbackend.repository.IQGameRepository;
import com.example.mindbuilderbackend.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IQGameService {

    private final IQGameRepository iqGameRepository;
    private final TeacherRepository teacherRepository;

    public IQGameService(IQGameRepository iqGameRepository,
                         TeacherRepository teacherRepository) {
        this.iqGameRepository = iqGameRepository;
        this.teacherRepository = teacherRepository;
    }

    public IQGameResponseDTO createGame(IQGameDTO gameDTO) {
        Teacher teacher = teacherRepository.findById(gameDTO.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + gameDTO.getTeacherId()));

        IQGame game = new IQGame();
        game.setTitle(gameDTO.getTitle());
        game.setDifficultyLevel(gameDTO.getDifficultyLevel());
        game.setTeacher(teacher);

        IQGame savedGame = iqGameRepository.save(game);
        return mapToResponseDTO(savedGame);
    }

    public IQGameResponseDTO getGameById(Long gameId) {
        IQGame game = iqGameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("IQGame not found with id: " + gameId));
        return mapToResponseDTO(game);
    }

    public List<IQGameResponseDTO> getAllGames() {
        List<IQGame> games = iqGameRepository.findAll();
        return games.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    public List<IQGameResponseDTO> getGamesByTeacher(Long teacherId) {
        if (!teacherRepository.existsById(teacherId)) {
            throw new ResourceNotFoundException("Teacher not found with id: " + teacherId);
        }
        List<IQGame> games = iqGameRepository.findByTeacherId(teacherId);
        return games.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    public List<IQGameResponseDTO> getGamesByDifficulty(String difficultyLevel) {
        List<IQGame> games = iqGameRepository.findByDifficultyLevel(difficultyLevel);
        if (games.isEmpty()) {
            throw new ResourceNotFoundException("No games found with difficulty level: " + difficultyLevel);
        }
        return games.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    public IQGameResponseDTO updateGame(Long gameId, IQGameDTO gameDTO) {
        IQGame game = iqGameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("IQGame not found with id: " + gameId));

        if (gameDTO.getTeacherId() != null) {
            Teacher teacher = teacherRepository.findById(gameDTO.getTeacherId())
                    .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + gameDTO.getTeacherId()));
            game.setTeacher(teacher);
        }

        if (gameDTO.getTitle() != null) {
            game.setTitle(gameDTO.getTitle());
        }

        if (gameDTO.getDifficultyLevel() != null) {
            game.setDifficultyLevel(gameDTO.getDifficultyLevel());
        }

        IQGame updatedGame = iqGameRepository.save(game);
        return mapToResponseDTO(updatedGame);
    }

    public void deleteGame(Long gameId) {
        IQGame game = iqGameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("IQGame not found with id: " + gameId));
        iqGameRepository.delete(game);
    }

    private IQGameResponseDTO mapToResponseDTO(IQGame game) {
        IQGameResponseDTO responseDTO = new IQGameResponseDTO();
        responseDTO.setGameId(game.getGameId());
        responseDTO.setTitle(game.getTitle());
        responseDTO.setDifficultyLevel(game.getDifficultyLevel());

        if (game.getTeacher() != null) {
            responseDTO.setTeacherId(game.getTeacher().getId());
            responseDTO.setTeacherName(game.getTeacher().getName());
        }

        if (game.getLessons() != null) {
            responseDTO.setLessonIds(game.getLessons().stream()
                    .map(lesson -> lesson.getLessonId())
                    .collect(Collectors.toList()));
        }

        if (game.getResults() != null) {
            responseDTO.setResultIds(game.getResults().stream()
                    .map(result -> result.getResultId())
                    .collect(Collectors.toList()));
        }

        return responseDTO;
    }
}