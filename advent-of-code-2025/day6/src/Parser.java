import java.util.Arrays;
import java.util.Map;

public class Parser {
    public static Data parse(String input) {
        String[] numbersWithOperators = input.split("\n");
        String[] operators = numbersWithOperators[numbersWithOperators.length - 1].trim().split(" +");
        String[] numbers = Arrays.copyOfRange(numbersWithOperators, 0, numbersWithOperators.length - 1);
        return new Data(numbers, operators);
    }
}
