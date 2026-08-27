public class Joltage {

    public static Long getLargestJoltage(String batteries) {
        String[] joltages = batteries.split("");
        int latestLargestIndex = 0;
        StringBuilder largestJoltage = new StringBuilder();

        for (int i = 0; i < 12; i++) {

            int largestJoltageOfABattery = 0;
            for (int j = latestLargestIndex; j < i + joltages.length - 11; j++) {
                int currentJoltage = Integer.parseInt(joltages[j]);

                if (largestJoltageOfABattery < currentJoltage) {
                    largestJoltageOfABattery = currentJoltage;
                    latestLargestIndex = j + 1;
                }
            }

            largestJoltage.append(largestJoltageOfABattery);
        }

        return Long.parseLong(largestJoltage.toString());
    }
}