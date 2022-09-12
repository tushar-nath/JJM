var listItemContainer = document.getElementsByTagName("ul")[0];
var listItems = document.getElementsByTagName("li");
var itemInfoContainer = document.getElementById("item-info-container");

const itemHeight = 106;

for (var i = 0; i < listItems.length; i++) {
  listItems[i].style.top = (i * itemHeight).toString() + "px";
}

var active = document.getElementsByClassName("active")[0];
var activeIndex = 2;
var canScroll = true;

listItemContainer.addEventListener('wheel', function(event) {
  if (canScroll == true) {
    if (event.deltaY < 0) {
      scrollUp();
    }
    else if (event.deltaY > 0) {
      scrollDown();
    }
  }
});

function scrollUp() {
  canScroll = false;

  if (activeIndex == (listItems.length - 3)) {
      listItems[0].style.top = ((listItems[0]).offsetTop + (itemHeight * listItems.length)).toString() + "px";
      listItemContainer.append(listItems[0]);
    }
    else {
      activeIndex += 1;
    }

    for (var i = 0; i < document.getElementsByTagName("li").length; i++) {
      listItems[i].style.animation = "scroll-up 0.1s forwards";
      
      adjustScroll(listItems[i], true);
    }

    active.classList.remove("active");
    active = active.nextElementSibling;
    active.classList.add("active");

    displayInfo(active);
}

function scrollDown() {
  canScroll = false;

  if (activeIndex == 2) {
      listItems[listItems.length - 1].style.top = ((listItems[listItems.length - 1]).offsetTop - (itemHeight * listItems.length)).toString() + "px";
      listItemContainer.prepend(listItems[listItems.length - 1]);
    }
    else {
      activeIndex -= 1;
    }

    for (var i = 0; i < listItems.length; i++) {
      listItems[i].style.animation = "scroll-down 0.1s forwards";

      adjustScroll(listItems[i], false);
    }

    active.classList.remove("active");
    active = active.previousElementSibling;
    active.classList.add("active");

    displayInfo(active);
}

function adjustScroll(item, direction) {
  setTimeout(function() {
    if (direction == true) {
      item.style.top = (item.offsetTop - itemHeight).toString() + "px";
    }
    else {
      item.style.top = (item.offsetTop + itemHeight).toString() + "px";
    }

    item.style.animation = "none";

    canScroll = true;
  }, 100);
}

function scrollUpButton() {
  if (canScroll == true) {
    scrollUp();
  }
}

function scrollDownButton() {
  if (canScroll == true) {
    scrollDown();
  }
}

function displayInfo(item) {
  itemInfoContainer.innerHTML = item.getElementsByClassName("item-info")[0].textContent;
}
