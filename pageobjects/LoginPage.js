class LoginPage{

constructor(page){
    this.loginPage = page;
    this.loginButton = page.locator("[name='login']");
    this.userName = page.locator("#userEmail");
    this.passWord = page.locator("[formcontrolname='userPassword']");
}

async goToLoginPage(){
    //Open login page
    await this.loginPage.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

async validLogin(username,password){
     //Enter user credentials and login
    await this.userName.fill(username);
    await this.passWord.fill(password);
    await this.loginButton.click();
    //Wait for all API calls to be made in the page after login
    //await this.page.waitForLoadState('networkidle');
}
}
module.exports = {LoginPage};