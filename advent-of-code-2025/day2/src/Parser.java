public class Parser {
    public static Range parse (String input) {
        String[] range = input.split("-");

        long min = Long.parseLong(range[0]);
        int noOfMinDigits = range[0].length();
        long max = Long.parseLong(range[1]);
        int noOfMaxDigits = range[1].length();

        return new Range(min, max, noOfMinDigits, noOfMaxDigits);
    }
}
