class Shape {
    toString() {
        return "This shape has an area of " + this.area() + " and perimeter " + this.perimeter();
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
      super()
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return (this.width*2)+(this.height*2)
    }
}

class Square extends Rectangle {
  constructor() {
    super(3, 3);
  }
}


module.exports = {Shape, Rectangle, Square};