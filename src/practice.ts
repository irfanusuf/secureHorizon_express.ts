let firstName: string = "Dylan";     // explicit data type 

// firstName = 66    // can,t reassign number to string 

let lastname = "khan";       // implicit data type    /// infer

console.log(typeof lastname)

//  lastname = 44       // can,t reassign number to string   


const json = JSON.parse("55");

console.log(typeof json);     // failed to infer that json is an object and returned number 



// let u = true;
// u = "string"; // Error: Type 'string' is not assignable to type 'boolean'.
// Math.round(u); // Error: Argument of type 'boolean' is not assignable to parameter of type 'number'.

let v: any = true;
v = "string"; // no error as it can be "any" type
Math.round(v); // no error as it can be "any" type



const names: string[] = [];
names.push("Dylan"); // no error

//names.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.


const kuchAur: readonly string[] = ["Dylan"];
// kuchAur.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.
// try removing the readonly modifier and see if it works?


const numbers = [1, 2, 3]; // inferred to type number[]
numbers.push(4); // no error
// comment line below out to see the successful assignment
//numbers.push("2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.



// define our tuple
let ourTuple: [number, boolean, string];
// initialized correctly
ourTuple = [3, false, "ejsegb"]


// define our tuple
let readonlyTuple: [number, boolean, string];
// initialize correctly
readonlyTuple = [5, false, 'coding'];
// We have no type safety in our tuple for indexes 3+
ourTuple.push('Something new and wrong');
console.log(ourTuple);   // this will happen but there wil not type safety after index 2


const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding '];
// throws error as it is readonly.
// ourReadonlyTuple.push('Coding took a day off');


// function getTime(): string {
//     return new Date().getTime();
//   }


function getTime(): number {
  return new Date().getTime();
}


// error 
function printHello(): void {
  console.log('Hello!');
}



function multiply(a: number, b: number) {
  return a * b;
}

multiply(3, 5);    // sucess
// multiply(3,"4")    // error




function add(a: number, b: number, c?: number) {
  return a + b + (c || 0);
}


add(3, 4)



// successs in  another way 
// function add(a: number, b: number, c: number = 0) {
//   return a + b + c ;
// }


// error
// function add(a: number, b: number, c: number) {
//   return a + b + (c || 0);
// }


add(4, 5, 6)
add(3, 4)



function pow(base: number, power: number = 10): number {
  return base ** power;
}


function addnew(a: number, b: number, ...rest: number[]) {
  return a + b + rest.reduce((p, c) => p + c, 0);
}


function component(value: number, loading: true, ...rest: string[]) {

  return loading;

}


function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
  return dividend / divisor;
}

const propTypes: { email: string, username: string } = {

  username: "",
  email: ""

}

function component2({ email, username }: typeof propTypes) {


}


interface prop {
  email: string
  username: string,

}



function component3({ email, username }: prop) {


}





const car: { name: string, model: string, year: number, mileage?: number } = {

  name: "Toyota",
  model: "Corolla",
  year: 2009,


};

car.mileage = 6   // succes mentioned as optional 
// car.expiry = 4    // error because not mentioned in types 


//  car.name = 4    // error 
car.year = 2010    // success






const nameAgeMap: { [index: string]: number } = {

  maroof: 3,
  dua: 32,
  malik: 22,


};


const nato: { [index: string]: string } = {

  home: "3",
  age: "32"


};


//itialiized enum 

enum CardinalDirections {
  North = 1,       // auto increment
  East,
  South,
  West
}
// logs 1
console.log(CardinalDirections.North);
// logs 4
console.log(CardinalDirections.West);



// fully intialized enum 

enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}
// logs 404
console.log(StatusCodes.NotFound);
// logs 200
console.log(StatusCodes.Success);




// intialized string enums
enum CardinalDirectionsString {
  North = 'North',
  East = "East",
  South = "South",
  West = "West"
};
// logs "North"
console.log(CardinalDirections.North);
// logs "West"
console.log(CardinalDirections.West);




// type aliases 

type CarModel = string


const carModel: CarModel = "Corolla"




interface Rectangle {
  height: number,
  width: number
}


interface Cuboid {
  length : number,
  height: number,
  width: number

}

const rectangle : Rectangle= {
  // length : 30,    //  give error // not taking the cues from interface 
  height: 20,
  width: 10
};




const cuboid: Cuboid = {
  length : 10,
  height: 20,
  width: 10
};



interface ColoredRectangle extends Rectangle {
  color: string
}

const coloredRectangle: ColoredRectangle = {
  height: 20,
  width: 10,
  color : "red",

};



function printStatusCode(code: string | number) {
  console.log(`My status code is ${code}.`)
}



// function printStatusCode2(code: string | number) {
//   console.log(`My status code is ${code.toUpperCase()}.`) // error: Property 'toUpperCase' does not exist ontype 'string | number'.
  
// }

printStatusCode(404);
printStatusCode('404');
printStatusCode("200")



const x: unknown = 4;
console.log((x as string).length);


const y: unknown = 4;
console.log(( <string> y).length);


let z = 'hello';
//console.log(((x as unknown) as number).length); // x is not actually a number so this will return undefined




class Person {
  public user: string;
  public age : number

  public constructor(username: string , age : number) {
    this.user = username;
    this.age = age
  }

  getName(): string {
    return this.user;
  }

  getAge(): number {
    return this.age;
  }
}




// class connectDb {

//  public mongoUri = process.env.URI


// public constructor() {
//    let uri
//    this.mongoUri = uri
//     mongoose.connect(uri)
    
//   }

// }

// connectDb()




const person = new Person("wasiq" , 20)


console.log(person.getName()); // person.name is from outside the class since it's public
console.log(person.getAge());



console.log(addnew(10, 3, 5, 7, 8, 9, 0))