import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../providers/user-service/user-service';
import { ToastController, AlertController } from 'ionic-angular';
import { LoginPage, dataLX } from '../login/login';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public message: string;
  public list = [
    {name: 'albums', text: 'Button Item'},
    {name: 'american-football', text: 'Button Item'},
    {name: 'analytics', text: 'Button Item'},
    {name: 'archive', text: 'Button Item'}
  ];
  constructor(public navCtrl: NavController, public userService: UserService, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  logout() {
    this.message = '';
    this.presentConfirm();
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.message,
      duration: 2000,
      position: 'middle'
    })
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '真的要退出吗？',
      message: '',
      buttons: [
       {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        } 
       },
       {
         text: '确定',
         handler: () => {
          this.userService.Logout().then((data: dataLX) => {
            if(data.recode != 0){
              console.log(data);
              this.message = '退出失败！';
              this.presentToast();
            }else{
              this.message = '退出成功！';
              this.presentToast();
              localStorage.removeItem('username');
              localStorage.removeItem('password');
              localStorage.removeItem('sid');
              localStorage.removeItem('uid');
              this.navCtrl.push(LoginPage);
            }
          })
         }
       } 
      ]
    })
    alert.present();
  }
  goDetail(i){
    this.navCtrl.push(DetailPage,{item:i});
  }
}
