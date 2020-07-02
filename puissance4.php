<?php

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Puissance 4</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link href="./style/style.css" type="text/css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet">
    <script src="Hao4Plugin.js"></script>
</head>

<body>
    <main>
        <section id="welcome-page">
            <h1 id="game-title">CONNECT 4</h1>
            <div class="setting-form" id="main-menu">
                <div class="main-btn">
                    <button id="btn-1-player">1 PLAYER</button>
                    <button id="btn-2-player">2 PLAYERS</button>
                    <button id="btn-settings">Settings</button>
                </div>
            </div>
            <div class="setting-form" id="game-settings">
                <div class="settings-div">
                    <div class="player1-div" style="margin-right:10px;">
                        <h3>Player 1</h3>
                        <div><label for="settings-p1name">Name </label><input value="PEPEGA" type="text"
                                name="settings-p1name" id="settings-p1name" autocomplete="off" /></div>
                        <div>
                            <label for="settings-p1color">Color</label>
                            <select name="color" id="settings-p1color">
                                <option value="red">Red</option>
                                <option value="yellow">Yellow</option>
                                <option value="purple">Purple</option>
                                <option value="turquoise">Turquoise</option>
                                <option value="aquamarine">Aquamarine</option>
                                <option value="chartreuse">Chartreuse</option>
                            </select>
                        </div>
                        <div class="imgselect">
                            <div class="pepega pimg p1" id="pepega"></div>
                            <div class="minglee pimg p1" id="minglee"></div>
                            <div class="forsensmug pimg p1" id="forsensmug"></div>
                            <div class="omegalul pimg p1" id="omegalul"></div>
                        </div>
                    </div>
                    <div class="player2-div">
                        <h3>Player 2</h3>
                        <div><label for="settings-p2name">Name </label><input value="Player 2" type="text"
                                name="settings-p2name" id="settings-p2name" autocomplete="off" /></div>
                        <div>
                            <label for="settings-p2color">Color</label>
                            <select name="color" id="settings-p2color">
                                <option value="yellow">Yellow</option>
                                <option value="red">Red</option>
                                <option value="purple">Purple</option>
                                <option value="turquoise">Turquoise</option>
                                <option value="aquamarine">Aquamarine</option>
                                <option value="chartreuse">Chartreuse</option>
                            </select>
                        </div>
                        <div class="imgselect">
                            <div class="forsencd pimg p2" id="forsencd"></div>
                            <div class="ayaya pimg p2" id="ayaya"></div>
                            <div class="gabenget pimg p2" id="gabenget"></div>
                            <div class="forsen1 pimg p2" id="forsen1"></div>
                        </div>
                    </div>
                </div>

                <div class="grid-settings">
                    <div><label for="settings-rows">Number of rows </label><input value="6" type="number"
                            name="settings-rows" id="settings-rows" autocomplete="off" /></div>
                    <div><label for="settings-cols">Number of colums </label><input value="7" type="number"
                            name="settings-cols" id="settings-cols" autocomplete="off" /></div>
                </div>
                <button id="settings-save">SAVE</button>
            </div>
        </section>
        <section id="gamesection" style="display: flex;justify-content: center; margin-top: 50px;">
            <div class="pscore">
                <span class="pname" id="P1name"></span><span id="P1score"></span>
                <div class="p1img"></div>
            </div>
            <div id="game-area">

            </div>
            <div class="pscore" style="text-align: end;"><span class="pname" id="P2name"></span><span
                    id="P2score"></span>
                <div class="p2img"></div>
            </div>
        </section>
    </main>
    <footer>
    </footer>
</body>

</html>
