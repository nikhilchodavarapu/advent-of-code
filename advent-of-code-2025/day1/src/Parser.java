package day1.src;

public class Parser {

  public static Rotation parse(String rotation) {
    String[] splittedRotation = rotation.split("", 2);
    RotationDirection direction = RotationDirection.valueOf(splittedRotation[0]);
    int distance = Integer.parseInt(splittedRotation[1]);
    return new Rotation(direction, distance);
  }
}
