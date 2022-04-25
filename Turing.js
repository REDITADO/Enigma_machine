let keyboard = document.querySelector(".keyBoard")
let lampBoard = document.querySelector(".lampBoard")
let steckerBred = document.querySelector(".steckerBred")

let rotors1 = document.querySelector(".rotors .rotor1")
let rotors2 = document.querySelector(".rotors .rotor2")
let rotors3 = document.querySelector(".rotors .rotor3")


//basic configs 
let rotors = [0,0,0]
let steckerConfig ={
    A:null,B:null,C:null,
    D:null,E:null,F:null,
    G:null,H:null,I:null,
    J:null,K:null,L:null,
    M:null,N:null,O:null,
    P:null,R:null,S:null,
    T:null,U:null,V:null,
    W:null,X:null,Y:null,
    z:null
}
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

//inicializar teclas
for(let i=0;i<26;i++){
    let teclas = document.createElement("button")
    teclas.innerHTML=alphabet[i]
    teclas.value = alphabet[i]
    teclas.classList.add("teclas")
    keyboard.appendChild(teclas)

    let Lamps = document.createElement("input")
    Lamps.value=alphabet[i]
    Lamps.disabled=true
    Lamps.classList.add("lamps")
    lampBoard.appendChild(Lamps)

    // const steckerLabel = document.createElement("label")
    // steckerLabel.innerHTML=alphabet[i]
    // steckerLabel.classList.add("steckerLabel")
    // steckerBred.appendChild(steckerLabel)
}

const base = Array.from(alphabet)
const rotor_0 =  new Array("E", "K", "M", "F", "L", "G", "D", "Q", "V", "Z", "N", "T", "O", "W", "Y", "H", "X", "U", "S", "P", "A", "I", "B", "R", "C", "J")               
const rotor_1 = new Array("A", "J", "D", "K", "S", "I", "R", "U", "X", "B", "L", "H", "W", "T", "M", "C", "Q", "G", "Z", "N", "P", "Y", "F", "V", "O", "E")               
const rotor_2 =new Array("B", "D", "F", "H", "J", "L", "C", "P", "R", "T", "X", "V", "Z", "N", "Y", "E", "I", "W", "G", "A", "K", "M", "U", "S", "Q", "O")      
const reflector = new Array("Y", "R", "U", "H", "Q", "S", "L", "D", "P", "X", "N", "G", "O", "K", "M", "I", "E", "B", "F", "Z", "C", "W", "V", "J", "A", "T") 

let letter = "A"
const btntcl = document.querySelectorAll(".teclas")
let i 
rotors1.innerHTML=rotors[0]
rotors2.innerHTML = rotors[1]
rotors3.innerHTML = rotors[2]
btntcl.forEach(btn=>{
    btn.addEventListener("click",()=>{
        
        i = weel(rotor_2,base,rotors,2, btn.value,false,false)
        i = weel(rotor_1,base,rotors,1,i,false,false)
        i = weel(rotor_0,base,rotors,0,i,false,false)
        i = reflector[base.indexOf(i)]
        i= weel(rotor_0,base,rotors,0,i,true,false)
        i  = weel(rotor_1, base, rotors,1,i,true,false)
        i = weel(rotor_2,base,rotors,2,i,true,true)
        rotors1.innerHTML=rotors[0]
        rotors2.innerHTML = rotors[1]
        rotors3.innerHTML = rotors[2]
        document.querySelector(".screen").value+=i
        document.querySelectorAll(".lamps")[base.indexOf(i)].classList.add("active")
        setTimeout(()=>{
            document.querySelectorAll(".lamps")[base.indexOf(i)].classList.remove("active")
        },200)
    })
})




function weel(rotor,base, positions,wp, i,reverse, active){
    let k 
    // console.log(rotor,base, positions,wp, i,reverse)
    if(!reverse){
        // console.log(i)
        for(let j = 1; j<=positions[wp];j++){

            // console.log(rotor,i,j,positions[wp])
            rotor.push(rotor.shift())
        }
        k = rotor.indexOf(i)
        // console.log(i,k,base[k],rotor)
        return base[k]
    }else{
        
        k =base.indexOf(i)
        //  console.log(i,k,rotor[k],rotor)
        let result=rotor[k]

        if(active){
            // console.log(i,active)
        positions[0]++
        if(positions[0]==26){
            positions[0] = 0
            positions[1]++
        }else if(positions[1]==26){
            positions[1] = 0
            positions[2]++
        }
    }
        return result
    }
}