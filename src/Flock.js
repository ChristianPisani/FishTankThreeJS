import {
    useFrame
} from "@react-three/fiber";
import {
    Vector3
} from "three";

export class Boid {
    constructor() {
        this.position = new Vector3(0,0,0);
        
        const maxVelocity = 0.1;
        const randomVelocity = Math.random() * maxVelocity;
        this.velocity = new Vector3(0,0,0);
        this.velocity.randomDirection();
        this.velocity.multiplyScalar(randomVelocity);
        
        this.acceleration = new Vector3(0,0,0);
        this.rotation = new Vector3(0,0,0);
        this.scale = new Vector3(0,0,0);
        
        // this.velocity = Vector3.random().multiplyScalar(Math.random() * 0.5);
    }

    maxVelocity = 0.06;
    
    calculateFlocking(boids) {
        const maxDistance = 5;
        const maxForceAlignment = 0.0001;
        const maxForceSeparation = 0.0004;
        const maxForceCohesion = 0.0003;
        const maxSpeedAlignment = 2;
        const maxSpeedSeparation = 6;
        const maxSpeedCohesion = 0.1;
        
        let averageVelocity = new Vector3(0,0,0);
        let averagePositionSeparation = new Vector3(0,0,0);
        let averagePositionCohesion = new Vector3(0,0,0);
        
        let total = 0;
        
        for(let other of boids) {
            const distance = other.position.distanceTo(this.position);
            
            if(other === this || distance > maxDistance) continue;
            
            const otherVelocity = new Vector3(other.velocity.x, other.velocity.y, other.velocity.z);
            averageVelocity.add(otherVelocity);

            const differenceSeparation = new Vector3(this.position.x, this.position.y, this.position.z);
            differenceSeparation.sub(other.position);
            differenceSeparation.divideScalar(distance * distance)
            averagePositionSeparation.add(differenceSeparation);

            const otherPosition = new Vector3(other.position.x, other.position.y, other.position.z);
            averagePositionCohesion.add(otherPosition);
            
            total++;
        }
        
        /*const vectorFromZero = new Vector3(this.position.x, this.position.y - 5, this.position.z);
        vectorFromZero.multiplyScalar(-1);
        vectorFromZero.divideScalar(1000);
        averageVelocity.add(vectorFromZero);*/
        
        const force = new Vector3(0,0,0);

        if(total > 0) {
            averageVelocity.divideScalar(total);
            averageVelocity.setLength(maxSpeedAlignment);
            averageVelocity.sub(this.velocity);
            averageVelocity.clampLength(0, maxForceAlignment);

            averagePositionSeparation.divideScalar(total);
            averagePositionSeparation.setLength(maxSpeedSeparation);
            averagePositionSeparation.sub(this.position);
            averagePositionSeparation.clampLength(0, maxForceSeparation);

            averagePositionCohesion.divideScalar(total);
            averagePositionCohesion.setLength(maxSpeedCohesion);
            averagePositionCohesion.sub(this.position);
            averagePositionCohesion.clampLength(0, maxForceCohesion);
            
            force.add(averageVelocity);
            force.add(averagePositionSeparation);
            force.add(averagePositionCohesion);
        }
        
        return force;
    }
    
    flock(boids) {
        const flockingForce = this.calculateFlocking(boids);
        this.acceleration.add(flockingForce);
    }
    
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.clampLength(0, this.maxVelocity);
        this.position.add(this.velocity);

        this.acceleration = new Vector3(0,0,0);
    }
}

export class Flock {
    constructor() {
        this.boids = [];
    }
    
    update() {
        if(!this.boids) return;
        
        this.boids.forEach(boid => {
            boid.flock(this.boids);
        });
        
        this.boids.forEach(boid => {
            boid.update();
        });
    };
}