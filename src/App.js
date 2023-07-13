
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import './App.css'

function App() {

  const [scene, setScene] = useState(new THREE.Scene())

  const [camera, setCamera] = useState(new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  ))

  const [cube, setCube] = useState()
  const [red, setRed] = useState()

  useEffect(() => {
    // const scene = new THREE.Scene();

    // const camera = new THREE.PerspectiveCamera(
    //   50, 
    //   window.innerWidth / window.innerHeight,
    //   1, 
    //   1000
    // );

    setCamera(new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    ))

    camera.position.z = 96;

    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer(
      {
        canvas,
        antialias: true,
      }
    )

    setRed(renderer)

    renderer.setSize(500, 500);
    document.body.appendChild(renderer.domElement)




    const animate = () => {

      if(cube){
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate();

  }, [])

  const showCube =() => {
    const boxGeometry = new THREE.BoxGeometry(30, 30, 30);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    setCube(boxMesh)
    scene.add(boxMesh);


    const animate = () => {

      
      boxMesh.rotation.x += 0.01;
      boxMesh.rotation.y += 0.01;
    
      
      red.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    animate()

  }

  const showLine = () => {
    var points = [];
    points.push(
      new THREE.Vector3(-500, 250, 0), 
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 100, 0)
    );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 3,
      scale: .1,
  }));
  line.computeLineDistances();
  scene.add(line);

  const animate = () => {    
    red.render(scene, camera);
    window.requestAnimationFrame(animate);
  }

  animate();
  }

  return (
    <div className='mainDiv'>

      <div className="canvasDiv">
        <canvas id="myThreeJsCanvas" />
      </div>

      <div className="controlDiv">
          <button onClick={() =>{
            if (scene.children.length > 0) scene.remove(scene.children[0]);
            
            showCube()}}>generate a cube</button>


          <button onClick={() => {
            if (scene.children.length > 0) scene.remove(scene.children[0]);
            showLine();
          }}>generate a line</button>

          <button onClick={()=>{
            while(scene.children.length > 0) scene.remove(scene.children[0]);
          }}>Clear Canvas</button>
      </div>
    </div>
  );
}

export default App;
