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
    
    calculateAligment(boids) {
        const maxDistance = 0.5;
        const maxForce = 0.0005;
        const maxSpeed = 2;
        
        let averageVelocity = new Vector3(0,0,0);
        let total = 0;
        
        for(let other of boids) {
            if(other === this || other.position.distanceTo(this.position) > maxDistance) continue;
            
            let otherVelocity = new Vector3(other.velocity.x, other.velocity.y, other.velocity.z);
            averageVelocity.add(otherVelocity);
            
            total++;
        }
        
        /*const vectorFromZero = new Vector3(this.position.x, this.position.y - 5, this.position.z);
        vectorFromZero.multiplyScalar(-1);
        vectorFromZero.divideScalar(1000);
        averageVelocity.add(vectorFromZero);*/

        if(total > 0) {
            averageVelocity.divideScalar(total);
            averageVelocity.setLength(maxSpeed);
            averageVelocity.sub(this.velocity);
            averageVelocity.clampLength(0, maxForce);
        }
        
        return averageVelocity;
    }

    calculateSeparation(boids) {
        const maxDistance = 5;
        const maxForce = 0.0004;
        const maxSpeed = 6;
        
        let averagePosition = new Vector3(0,0,0);
        let total = 0;

        for(let other of boids) {
            const distance = other.position.distanceTo(this.position);
            
            if(other === this || distance > maxDistance) continue;
            
            const difference = new Vector3(this.position.x, this.position.y, this.position.z);
            difference.sub(other.position);
            difference.divideScalar(distance * distance)
            averagePosition.add(difference);
            
            total++;
        }

        if(total > 0) {
            averagePosition.divideScalar(total);
            averagePosition.setLength(maxSpeed);
            averagePosition.sub(this.position);
            averagePosition.clampLength(0, maxForce);
        }

        return averagePosition;
    }

    calculateCohesion(boids) {
        const maxDistance = 5;
        const maxForce = 0.0001;
        const maxSpeed = 0.1;
        
        let averagePosition = new Vector3(0,0,0);
        let total = 0;

        for(let other of boids) {
            if(other === this || other.position.distanceTo(this.position) > maxDistance) continue;

            let otherPosition = new Vector3(other.position.x, other.position.y, other.position.z);
            averagePosition.add(otherPosition);
            
            total++;
        }

        if(total > 0) {
            averagePosition.divideScalar(total);
            averagePosition.setLength(maxSpeed);
            averagePosition.sub(this.position);
            averagePosition.clampLength(0, maxForce);
        }

        return averagePosition;
    }
    
    flock(boids) {
        const alignment = this.calculateAligment(boids);
        this.acceleration.add(alignment);

        const cohesion = this.calculateCohesion(boids);
        this.acceleration.add(cohesion);

        const separation = this.calculateSeparation(boids);
        this.acceleration.add(separation);
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