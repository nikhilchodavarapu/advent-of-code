import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Parser {
    public static DataBase parse(String input) {
        String[] separatedData = input.split("\n\n");
        String[] rawRanges = separatedData[0].split("\n");
        String[] rawIngredients = separatedData[1].split("\n");

        List<Range> ranges = praseRanges(rawRanges);
        List<Long> availableIngredients = praseAvailableIngredients(rawIngredients);

        return new DataBase(ranges, availableIngredients);
    }

    private static List<Long> praseAvailableIngredients(String[] rawIngredients) {
        return Arrays.stream(rawIngredients).map(Long::parseLong).toList();
    }

    private static List<Range> praseRanges(String[] rawRanges) {
        List<Range> ranges = new ArrayList<>();

        for (String rawRange : rawRanges) {
            if (rawRange.isEmpty()) {
                continue;
            }

            String[] limits = rawRange.split("-");
            Long min = Long.parseLong(limits[0]);
            Long max = Long.parseLong(limits[1]);
            ranges.add(new Range(min, max));
        }

        return ranges;
    }
}
