package day1.src;

public class Dail {
  private int currentDail = 50;

  public void rotate(RotationDirection direction, int distance) {
    switch (direction) {
      case RotationDirection.L -> rotateLeft(distance);
      case RotationDirection.R -> rotateRight(distance);
    }
  }

  private void rotateLeft(int distance) {
    currentDail = currentDail - distance;
    while (currentDail < 0) {
      currentDail = 100 + currentDail;
    }
  }

  private void rotateRight(int distance) {
    currentDail = currentDail + distance;
    while (currentDail >= 100) {
      currentDail = currentDail - 100;
    }
  }

  public boolean isPointingAtZero() {
    return currentDail == 0;
  }

}
