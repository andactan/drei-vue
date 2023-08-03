import {
  BoxGeometry,
  CapsuleGeometry,
  CircleGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  IcosahedronGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  RingGeometry,
  SphereGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  TubeGeometry
} from 'three';

export const MATERIAL: { [key: string]: any } = {
  Basic: MeshBasicMaterial,
  Phong: MeshPhongMaterial
};

export const GEOMETRY: { [key: string]: any } = {
  Box: BoxGeometry,
  Capsule: CapsuleGeometry,
  Circle: CircleGeometry,
  Cylinder: CylinderGeometry,
  Dodecahedron: DodecahedronGeometry,
  Icosahedron: IcosahedronGeometry,
  Plane: PlaneGeometry,
  Ring: RingGeometry,
  Sphere: SphereGeometry,
  Tetrahedron: TetrahedronGeometry,
  Torus: TorusGeometry,
  Tube: TubeGeometry
};
