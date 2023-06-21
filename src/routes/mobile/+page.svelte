<body>
<div class="fuff">
    x
<div class="grid">
    <div class="one">
      One
    </div>
    <div class="two">
      Two
    </div>
    <div class="three">
      Three
    </div>
  </div>
    xxx
</div>
</body>
<style>
    body {
        height: 100%
    }

    .fuff {
        background-color: aqua;
        height: 100%;
    }

.grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas:
    "one two"
    "one three"
}

.one {
  background: red;
  grid-area: one;
  padding: 50px 0;
}

.two {
  background: green;
  grid-area: two;
}

.three {
  background: blue;
  grid-area: three;
}
</style>