let randomize_array = document.getElementById("randomize");
let minRange = 1;
let maxRange = 100;
let numOfBars = 60;
let heightFactor = 4;
let speedFactor = 20;
let unsorted_array = new Array(numOfBars);
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function createRandomArray() {
    for (let i = 0; i < numOfBars; i++) {
      unsorted_array[i] = randomNum(minRange, maxRange);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    createRandomArray();
    renderBars(unsorted_array);
  });
  
  function renderBars(array) {
    for (let i = 0; i < array.length; i++) {
      let bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = array[i] * heightFactor + "px";
      bar.style.backgroundColor="black"
      bars_container.appendChild(bar);
    }
  }
  
  randomize.addEventListener("click", function () {
    createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
  });
  
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  //bubblesort
  async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          for (let k = 0; k < bars.length; k++) {
            if (k !== j && k !== j + 1) {
              bars[k].style.backgroundColor = "black";
            }
          }
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
           bars[j].style.height = array[j] * heightFactor + "px";
          bars[j].style.backgroundColor = "blue";
           bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
          bars[j + 1].style.backgroundColor = "red";
          await sleep(speedFactor);
        }
      }
      await sleep(speedFactor);
    }
    return array;
  }

//inserationsort
 async function insertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "red";
            await sleep(speedFactor);
            for(let k=0;k<bars.length;k++){
              if (k != j + 1)
                bars[k].style.backgroundColor="black";
            }
            j = j - 1;
            
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
    }
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "black";
    }
    return array
}

async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].style.backgroundColor = "lightgreen";
  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].style.backgroundColor = "lightgreen";
  await sleep(speedFactor);
}
async function indexDivide(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex];
  bars[pivotIndex].style.backgroundColor = "#f40707";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "black";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars);
      i++;
      j--;
    }
  }

  return i;
}

  //quicksort
  async function quickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("bar");
    if (items.length > 1) {
      index = await indexDivide(items, left, right);
      if (left < index - 1) {
        //elements on the left side of the pivot
        await quickSort(items, left, index - 1);
      }
      if (index < right) {
        //elements on the right side of the pivot
        await quickSort(items, index, right);
      }
    }
  
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "bule";
    }
    return items;
  }

quick_sort.addEventListener("click", function () {
    let sortedArray=quickSort(unsorted_array, 0, unsorted_array.length - 1);
    console.log(sortedArray)
    });
  
bubble_sort.addEventListener("click", function () {
      let sortedArray=bubbleSort(unsorted_array);
      console.log(sortedArray)
      });
inseration_sort.addEventListener("click", function () {
        let sortedArray=insertionSort(unsorted_array);
        console.log(sortedArray)
});

merge_sort.addEventListener("click", function () {
  let sortedArray=mergeSort(unsorted_array,unsorted_array.length);
  console.log(sortedArray)
});

selection_sort.addEventListener("click", function () {
  let sortedArray=selectionSort(unsorted_array,unsorted_array.length);
  console.log(sortedArray)
});

function refreshPage(){
  window.location.reload();
}
stop_button.addEventListener("click", function () {
  window.refreshPage();
});



//mergeSorting
async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  let actualHalf = await mergeSort(left);
  await mergeSort(right);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }

    //visualize it for right and left side
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    if (k + arr.length < bars.length) {
      bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
      console.log(arr[k] * heightFactor);
      bars[k + arr.length].style.backgroundColor = "yellow";
    }
    await sleep(speedFactor);
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    j++;
    k++;
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "black";
  }
  return arr;
}

//selectionSorting
async function selectionSort(arr,  n)
{
  let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      bars[i].style.backgroundColor = "red"; 
      for (let j = i + 1; j < arr.length; j++) {
        bars[j].style.backgroundColor = "yellow"; 
        await sleep(speedFactor);
  
        if (arr[j] < arr[minIndex]) {
          if (minIndex !== i) {
            bars[minIndex].style.backgroundColor = "blue"; 
          }
          minIndex = j;
          bars[minIndex].style.backgroundColor = "red"; 
        } else {
          bars[j].style.backgroundColor = "blue"; 
        }
      }
  
      if (minIndex !== i) {
        await swap(arr, i, minIndex, bars);
      }
  
      bars[i].style.backgroundColor = "black"; 
    }
  
    bars[arr.length - 1].style.backgroundColor = "black"; 
    return arr;
}