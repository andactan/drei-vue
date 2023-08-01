import { Mesh } from "three";
import { type URDFRobot } from 'urdf-loader/src/URDFClasses';

export interface Tickable {
  tick(delta: number): void;
}

export class TickableMesh extends Mesh implements Tickable {
  tick(delta: number): void {
    console.log(`this method not implemented yet, but the tick value is ${delta}`)
  }
}


export interface TickableURDFRobot extends URDFRobot, Tickable {}