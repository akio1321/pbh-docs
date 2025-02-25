# Connect to BTN

 To participate in the BTN program, you just need to connect the BTN client to the BTN server. This article uses PeerBanHelper as the BTN client and Sparkle as the BTN server for demonstration.

## Sparkle

Sparkle is the official BTN server of PBH-BTN.

### Register an account, create UserApp

Open the browser and visit [https://sparkle.pbh-btn.com](https://sparkle.pbh-btn.com) and log in with GitHub authorization, an account will be automatically created.

Click on the "User Applications" link in the top menu to go to the management page.

![homepage](./assets/btn-homepage.png)

Click "Create New User Application", enter a note, and then click the button to create.

![management](./assets/userapp-management.png)

Now note down the `AppID` and `AppSecret` displayed on the page, because once you close this page, the `AppSecret` will no longer be displayed.

![created](./assets/userapp-created.png)

## Join the BTN network on PBH

Go to Settings -> Basic Settings option.

![btn1](./assets/btn1.jpg)

Scroll down to find BTN settings, open "Enable BTN Module", and fill in the AppID and App Secret obtained above:

![btn2](./assets/btn2.jpg)

Scroll to the bottom, click the "Save" button, and then restart PeerBanHelper to make it effective.

![btn3](./assets/btn3.jpg)
