// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var kMaxLogMessageLength = 20;
var logMessageArray = [];

function logText(text) {
    logMessageArray.push(text);
    if (logMessageArray.length > kMaxLogMessageLength)
        logMessageArray.shift();

    result.textContent = logMessageArray.join('\n');
}

function attachListeners() {
    var number1El = document.querySelector('#addend1');
    var number2El = document.querySelector('#addend2');
    var resultEl = document.querySelector('#result');

    document.getElementById('addAsync').addEventListener('click', function() {
        var value1 = parseInt(number1El.value);
        var value2 = parseInt(number2El.value);
        common.naclModule.postMessage([value1, value2]);

        // The result is returned in handleMessage below.
    });

    document.getElementById('addSync').addEventListener('click', function() {
        var value1 = parseInt(number1El.value);
        var value2 = parseInt(number2El.value);
        var result =
            common.naclModule.postMessageAndAwaitResponse([value1, value2]);

        // This is the result returned from the module synchronously (i.e. when the
        // addSync button is pressed)
        logText(result);
    });
}

// Called by the common.js module.
function handleMessage(message_event) {
    logText(JSON.stringify(message_event.data))
}
