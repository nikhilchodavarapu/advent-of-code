public class Joltage {

    public static int getLargestJoltage(String batteries) {
        String[] joltages = batteries.split("");
        int largest = Integer.parseInt(joltages[0]);
        int secondLargest = Integer.parseInt(joltages[1]);
        for (int i = 1; i < joltages.length - 1; i++) {

            int joltage = Integer.parseInt(joltages[i]);
            if (largest < joltage) {
                largest = joltage;
                secondLargest = Integer.parseInt(joltages[i + 1]);
            } else if (secondLargest < joltage){
                secondLargest = joltage;
            }
        }

        int lastJoltage = Integer.parseInt(joltages[joltages.length - 1]);
        if (secondLargest < lastJoltage) {
            secondLargest = lastJoltage;
        }

        return Integer.parseInt(largest + "" + secondLargest);
    }
}
