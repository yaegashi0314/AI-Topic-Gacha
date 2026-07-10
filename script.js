
// ===============================
// index.html
// 人数分の趣味入力欄を作成
// ===============================

function createInputs() {

    const count =
        document.getElementById("memberCount").value;


    const area =
        document.getElementById("hobbyInputs");


    area.innerHTML = "";


    if(count === "" || count <= 0){
        alert("人数を入力してください");
        return;
    }


    for(let i = 1; i <= count; i++){

        const input =
            document.createElement("input");


        input.type = "text";

        input.placeholder =
            i + "人目の趣味";


        input.className =
            "hobby";


        area.appendChild(input);


        area.appendChild(
            document.createElement("br")
        );

    }

}



// ===============================
// 趣味を保存してgame.htmlへ移動
// ===============================

function startGame(){

    const inputs =
        document.querySelectorAll(".hobby");


    const hobbies = [];


    inputs.forEach(input => {

        if(input.value !== ""){

            hobbies.push(input.value);

        }

    });



    if(hobbies.length === 0){

        alert("趣味を入力してください");

        return;

    }



    // 趣味を保存

    localStorage.setItem(
        "hobbies",
        JSON.stringify(hobbies)
    );



    // game.htmlへ

    location.href = "game.html";

}



// ===============================
// game.html
// 趣味を取得して表示
// ===============================


const savedHobbies =
    localStorage.getItem("hobbies");



if(savedHobbies){


    const hobbies =
        JSON.parse(savedHobbies);



    const hobbyText =
        document.getElementById("hobbyText");



    if(hobbyText){

        hobbyText.innerText =
            "参加者の趣味：" + hobbies.join("、");

    }

}


// ===============================
// AIで話題生成
// ===============================

async function generateTopic() {

    const display = document.getElementById("topicDisplay");

    const hobbies = JSON.parse(localStorage.getItem("hobbies"));

    display.innerText = "AIがお題を考えています...";

    const prompt = `
参加者の趣味は以下です。

${hobbies.join("、")}

この人たち全員が楽しく話せる会話のお題を1つだけ作ってください。
質問形式で、30文字以内にしてください。
`;

    try {

        const response = await fetch("https://ai-topic-gacha.onrender.com/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: prompt
            })

        });

        const data = await response.json();

        display.innerText = data.topic;

    } catch (error) {

        display.innerText = "AIとの通信に失敗しました。";

        console.error(error);

    }

}