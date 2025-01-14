import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImageSelectorComponent } from 'src/app/components/image-selector/image-selector.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GamificationService } from 'src/app/services/game/gamification.service';
import { StudyService } from 'src/app/services/game/study.service';
import { ActionsTrackerService } from 'src/app/services/logger/actions-tracker.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  progress;
  nearLevel = null;
  completedChallenges;
  actualLevel;
  points;
  user;
  ranks;
  studyOk = false;
  allCompleted = null;
  achievementAllCompleted = false;
  date;
  constructor(
    private gamificationService: GamificationService,
    private authService: AuthService,
    public dialog: MatDialog,
    public router: Router,
    private studyService: StudyService,
    private actionsTracker: ActionsTrackerService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.checkStudy();
    this.status();
    this.actionsTracker.start();
  }

  ngOnDestroy(): void {
    this.actionsTracker.stop();
  }

  redirectToStatistics() {
    const userId = this.user._id;
    this.router.navigate(['/statistics', userId]);
  }
  checkAllCompleted() {
    this.gamificationService
      .allCompleted(this.authService.getUser()._id)
      .subscribe(
        (response) => {
          this.allCompleted = response;
          if(this.allCompleted.finished){
            this.achievementAllCompleted = true;
            this.date = new Date(
              this.allCompleted.finishedAt
            ).toLocaleDateString();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCompletedChallenges() {
    this.gamificationService
      .userCompletedChallenges(this.authService.getUser()._id)
      .subscribe(
        (response) => {
          this.completedChallenges = response;
          for (let i = 0; i < this.completedChallenges.length; i++) {
            this.completedChallenges[i].dateDisplay = new Date(
              this.completedChallenges[i].completion_date
            ).toLocaleDateString();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getLevels() {
    this.gamificationService
      .userLevel(this.authService.getUser()._id)
      .subscribe(
        (response) => {
          let levels = response;
          console.log(levels[0].player.sourceId)
          this.actualLevel = levels[levels.length-1];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getPoints() {
    this.gamificationService
      .userPoints(this.authService.getUser()._id)
      .subscribe(
        (response) => {
          this.points = response;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  levelProgress() {
    this.gamificationService
      .userLevelProgress(this.authService.getUser()._id)
      .subscribe(
        (response) => {
          this.progress = response;
          this.nearLevel = this.progress[0];
          for (let i = 1; i < this.progress.length; i++) {
            if (
              this.progress[i].point_threshold < this.nearLevel.point_threshold
            ) {
              this.nearLevel = this.progress[i];
            }
          }
          if(this.nearLevel == null){
            document
            .getElementById('progressLevel')
            .setAttribute(
              'data-label',
              'MAX'
            );
          document.getElementById('progressValue').style.width =
            100 * 100 +
            '%';
          }
          else{
            document
            .getElementById('progressLevel')
            .setAttribute(
              'data-label',
              this.nearLevel.amount +
                '/' +
                this.nearLevel.point_threshold +
                ' ' +
                this.nearLevel.point.name
            );
          document.getElementById('progressValue').style.width =
            (this.nearLevel.amount / this.nearLevel.point_threshold) * 100 +
            '%';
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  openImageSelector() {
    const dialogRef = this.dialog.open(ImageSelectorComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this.gamificationService
        .changeProfileImage(this.authService.getUser()._id, res)
        .subscribe((response) => {
          this.user = this.authService.getUser();
          console.log(this.user.image_url)
        });
      console.log(res);
    });
  }
  rankings() {
    this.gamificationService
      .userRankings(this.authService.getUser()._id, 'ranking_exp')
      .subscribe(
        (response) => {
          let ranks = [];
          for (let i = 0; i < response.leaderboardResult.length; i++) {
            if (response.leaderboardResult[i].code === this.user.gm_code) {
              ranks.push(
                response.leaderboardResult[i].rank.toString() +
                  '° en cantidad de Experiencia'
              );
            }
          }
          this.ranks = ranks;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  status() {
    this.gamificationService.gamificationStatus().subscribe((response) => {
      if (response.gamified) {
        this.levelProgress();
        this.getCompletedChallenges();
        this.getLevels();
        this.getPoints();
        this.rankings();
        this.checkAllCompleted();
      }
    });
  }

  checkStudy() {
    let studyId = this.user.study;
    this.studyService.getStudy(studyId).subscribe((res) => {
      if(res.study) {
        this.studyOk = true;
      }
      else {
        console.log("Study assigned to this user doesn't exist");
      }
    },
    (err) => {
      console.log(err);
    });
  }

  play() {
    this.router.navigateByUrl('/start');
  }
}
