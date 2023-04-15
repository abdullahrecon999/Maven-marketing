import { CometChat } from "@cometchat-pro/chat";

const appID = "23351264da470b98";
const region = "eu";
const authKey = "f6ec0f6488c348a13799bea310837a431f85b3c6";



const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
function ChatInit(){
    CometChat.init(appID, appSetting).then(
        () => {
            console.log("Initialization completed successfully");
            ChatLogin("superhero2")
        },
        error => {
            console.log("Initialization failed with error:", error);
            // Check the reason for error and take appropriate action.
        }
        );
}

function ChatLogin (uid){
    CometChat.login(uid, authKey).then(
        user => {
          console.log("Login Successful:", { user });
        },
        error => {
          console.log("Login failed with exception:", { error });
        }
      );
}



function CreateNewChatUser(uid, name){
    var user = new CometChat.User(uid);
    user.setName(name);
     CometChat.createUser(user, authKey).then(
        user => {
            console.log("user created", user);
        },error => {
            console.log("error", error);
        }
    )
}

export {ChatInit, ChatLogin, CreateNewChatUser}