import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IQGameResponseDTO } from '../../dto/iq-game-response.dto';
import { IQGameDTO } from '../../dto/iq-game.dto';
import { IQGameService } from '../../service/iq-game.service';
import { TeacherService } from '../../service/teacher.service';
import { Teacher } from '../../model/teacher.model';

@Component({
  selector: 'app-iq-game-list',
  templateUrl: './iq-game-list.component.html',
  styleUrls: ['./iq-game-list.component.css'],
  standalone: false
})
export class IQGameListComponent implements OnInit {
  games: IQGameResponseDTO[] = [];
  filteredGames: IQGameResponseDTO[] = [];
  teachers: Teacher[] = [];
  searchText: string = '';
  filterBy: string = 'all';
  gameForm: FormGroup;
  isEditMode = false;
  currentGameId: number | null = null;
  difficultyLevels = ['Easy', 'Medium', 'Hard', 'Expert'];
  isLoading = false;

  constructor(
    private iqGameService: IQGameService,
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.gameForm = this.fb.group({
      teacherId: ['', Validators.required],
      title: ['', Validators.required],
      difficultyLevel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadGames();
    this.loadTeachers();
  }

  loadGames(): void {
    this.isLoading = true;
    this.iqGameService.getAllGames().subscribe({
      next: (games) => {
        this.games = games;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading games', err);
        this.isLoading = false;
      }
    });
  }

  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: (err) => console.error('Error loading teachers', err)
    });
  }

  applyFilter(): void {
    this.filteredGames = this.games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        game.teacherName.toLowerCase().includes(this.searchText.toLowerCase());

      if (this.filterBy !== 'all') {
        return matchesSearch && game.difficultyLevel === this.filterBy;
      }
      return matchesSearch;
    });
  }

  openAddModal(content: any): void {
    this.isEditMode = false;
    this.gameForm.reset();
    this.modalService.open(content, { size: 'lg' });
  }

  openEditModal(content: any, game: IQGameResponseDTO): void {
    this.isEditMode = true;
    this.currentGameId = game.gameId;
    this.gameForm.patchValue({
      teacherId: game.teacherId,
      title: game.title,
      difficultyLevel: game.difficultyLevel
    });
    this.modalService.open(content, { size: 'lg' });
  }

  onSubmit(): void {
    if (this.gameForm.invalid) return;

    const gameData: IQGameDTO = this.gameForm.value;
    this.isLoading = true;

    if (this.isEditMode && this.currentGameId) {
      this.iqGameService.updateGame(this.currentGameId, gameData).subscribe({
        next: () => {
          this.loadGames();
          this.modalService.dismissAll();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error updating game', err);
          this.isLoading = false;
        }
      });
    } else {
      this.iqGameService.createGame(gameData).subscribe({
        next: () => {
          this.loadGames();
          this.modalService.dismissAll();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error creating game', err);
          this.isLoading = false;
        }
      });
    }
  }

  confirmDelete(content: any, id: number): void {
    this.currentGameId = id;
    this.modalService.open(content);
  }

  deleteGame(): void {
    if (this.currentGameId) {
      this.isLoading = true;
      this.iqGameService.deleteGame(this.currentGameId).subscribe({
        next: () => {
          this.loadGames();
          this.modalService.dismissAll();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error deleting game', err);
          this.isLoading = false;
        }
      });
    }
  }

  getTeacherName(teacherId: number): string {
    const teacher = this.teachers.find(t => t.id === teacherId);
    return teacher ? `${teacher.name} (ID: ${teacher.id})` : `ID: ${teacherId}`;
  }
}
