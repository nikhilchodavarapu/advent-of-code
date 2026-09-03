import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class Parser {

    public static List<Coordinates> parse(String input) {
        return Arrays.stream(input.trim().split("\n")).map(getCoordinates()).toList();
    }

    private static Function<String, Coordinates> getCoordinates() {
        return x -> {
            String[] split = x.split(",");
            return new Coordinates(Long.parseLong(split[0]), Long.parseLong(split[1]));
        };
    }
}
