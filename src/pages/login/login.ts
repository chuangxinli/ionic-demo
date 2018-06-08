import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { UserService } from '../../providers/user-service/user-service';
import { AlertController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FindPasswordPage } from '../find-password/find-password';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService, Headers]
})
export class LoginPage {
  message: string;
  constructor(
    private app: App,
    public navCtrl: NavController,
    public userService: UserService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Confirm(userName, passWord) {
    console.log(userName);
    console.log(passWord);
    if(!userName){
      this.message = '用户名不能为空！';
      this.presentToast();
      return ;
    }
    if(!(/^\b[\w]{6,18}/.test(userName))){
      this.message = '用户名不和要求,为6至18个数字或字母！首字符不能为数字！';
      this.presentToast();
      return ;
    }
    if(!passWord){
      this.message = '密码不能为空！';
      this.presentToast();
      return ;
    }
    if(!(/[\w]{6,18}/.test(passWord))){
      this.message = '密码不和要求,为6至18个数字或字母!';
      this.presentToast();
      return ;
    }
    this.userService.Login(userName, passWord).then((data: dataLX)=> {
      if(data.recode !== 0){
        this.showAlert();
      }else{
        localStorage.setItem('username',userName);
        localStorage.setItem('password',passWord);
        localStorage.setItem('sid',data.sid);
        localStorage.setItem('uid',data.uid);
        this.app.getRootNav().setRoot(TabsPage);
      }
    })
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: '提示信息',
      subTitle: '账号或密码错误!',
      buttons: ['ok']
    });
    alert.present();
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
  ForgetPassword() {
    this.navCtrl.push(FindPasswordPage);
  }
}
export class dataLX {
  recode;
  msg;
  uid;
  sid;
}
