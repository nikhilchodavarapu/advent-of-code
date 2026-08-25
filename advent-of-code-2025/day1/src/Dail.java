package day1.src;

public class Dail {
  private int currentDail = 50;
  private int zeroHits = 0;

  public void rotate(RotationDirection direction, int distance) {
    switch (direction) {
      case RotationDirection.L -> rotateLeft(distance);
      case RotationDirection.R -> rotateRight(distance);
    }
  }

  private void rotateLeft(int distance) {
    boolean canCountCurrentRotation = currentDail != 0;
    currentDail = currentDail - distance;
    while (currentDail < 0) {
      currentDail = 100 + currentDail;
      zeroHits++;
    }

    if (!canCountCurrentRotation) zeroHits--;
    if (isPointingAtZero()) zeroHits++;
  }

  private void rotateRight(int distance) {
    currentDail = currentDail + distance;
    while (currentDail >= 100) {
      currentDail = currentDail - 100;
      zeroHits++;
    }
  }

  private boolean isPointingAtZero() {
    return currentDail == 0;
  }

  public int getZeroHits() {
    return zeroHits;
  }

}
