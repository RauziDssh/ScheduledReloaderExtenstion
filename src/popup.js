window.addEventListener('load', onLoad, false)

function setTimer(hour,minute,offsetms)
{
    chrome.windows.getCurrent(function(w) {
        chrome.runtime.sendMessage(
            {
                "window":w,
                "hour":hour,
                "minute":minute,
                "offsetms":offsetms
            });
    });
}

function onChangeCheckBox(e)
{
    if(e)
    {
        var timeTxt = document.getElementById("targetTimeInput").value;        
        var tmp = (timeTxt).split(':');
        var offsetms = document.getElementById("offsetms").value;        
        setTimer(tmp[0],tmp[1],offsetms);
    }
}

function onLoad() {
    document.getElementById('checker').onchange = () => { onChangeCheckBox(document.getElementById('checker').checked); };
}