module.exports = (url, token) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  * {
      background-color: #060611;
  }
  
  .neup {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border: solid black;
      border-radius: 40px;
      width: 550px;
      height: 700px;
      margin: 0 auto;
      margin-top: 100px;
      border: none;
      box-shadow: 7px 7px 5px rgba(58, 56, 94, 0.747),
                  -1px -1px 10px rgb(255, 255, 255);
  
  }
  
  .button {
      display: flex;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      padding: 20px;
      margin: 30px;
      width: 250px;
      background:aliceblue;
      border: none;
      /* margin-top: 100px; */
      cursor: pointer;
      border-radius: 50px;
      color: rgb(94, 94, 150);
      font-family: 'Poppins', sans-serif;
      box-shadow: 3px 3px 3px -1px rgba(10, 99, 169, 0.16),
                  -3px -3px 3px -1px rgba(255, 255, 255, 0.70);
  }
  
  p {
      padding-top: 70px;
      padding-left: 100px;
      padding-right: 100px;
      font-size: 16px;
      font-family: 'Poppins', sans-serif;
      color: white;
      text-align: center;
  }
  
  h1 {
      font-family: 'Poppins', sans-serif;
      color: white;
      font-size: 35px;
  }
  
  img {
      margin-top: 50px;
      width: 100px;
      height: 100px;
  }
  
  
  
  
      </style>
  </head>
  
  <body>
      <div class="container">
          <div class="neup">
              <h1>Thank you for joining us.</h1>
              <img src="https://cdn-icons-png.flaticon.com/512/6711/6711626.png ">
              <p>Welcome aboard serveUTM! To begin, please click the verification button below to activate your account. Let's explore together!</p>
              <a class="button" href="${url}/verify-confirm?token=${token}">Verify Email</a>
          </div>
      </div> 
  </body>
  </html>`;
};
