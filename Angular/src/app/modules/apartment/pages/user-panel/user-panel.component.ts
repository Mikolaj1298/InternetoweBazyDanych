import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../core/services/api.service';
import {UserModel} from '../../../../shared/models/User.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit, AfterViewChecked  {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  messageList: any[];
  public actualUser: any;
  userLoading: boolean;
  messageContent: string;
  public actualConversationId;
  public conversationContext: any[];
  public enableChat: boolean;
  public messagesLoading: boolean;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.actualUser = null;
    this.userLoading = false;
    this.messageList = [
      // {content: 'To nie ja', myMessage: false},
      // {content: 'To ja', myMessage: true},
    ];
    this.messageContent = '';
    this.actualConversationId = null;
    this.enableChat = true;
    this.messagesLoading = false;
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  public startConversation(): void {
    this.api.startConversation(this.actualUser).subscribe(res => {
      this.actualConversationId = res.id;
      this.messageList = res.messages;
      this.setMessageSender();
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public setMessageSender(): void {
    this.scrollToBottom();
    this.messageList.forEach(el => {
      el.myMessage = el.user.username === sessionStorage.getItem('AuthUsername');
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    this.messageList.sort(function(a, b) {
      return a.id - b.id;
    });
    this.messagesLoading = false;
    console.log(this.messageList);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  public getUserInfo(): void {
    this.userLoading = true;
    this.messagesLoading = true;
    this.api.getUserInfo(this.route.snapshot.params.id).subscribe(res => {
      this.actualUser = res;
      if (this.actualUser.username === sessionStorage.getItem('AuthUsername')) {
        this.enableChat = false;
      }
      this.startConversation();
      this.userLoading = false;
    });
  }

  public sendMessage(): void {
    if (this.messageContent !== '') {
      const data = {
        content: this.messageContent
      };
      this.messageContent = '';
      this.messagesLoading = true;
      this.api.addMessage(this.actualConversationId, data).subscribe(res => {
        this.actualConversationId = res.id;
        this.messageList = res.messages;
        this.setMessageSender();
      });
    }
  }
}
