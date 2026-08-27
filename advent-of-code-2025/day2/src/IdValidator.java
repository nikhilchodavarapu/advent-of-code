import java.util.ArrayList;
import java.util.List;

public class IdValidator {
    final int divider = 11;

    public List<Long> getInvalidIds(Range range) {
        List<Long> invalidId = new ArrayList<Long>();

        for (long i = range.min(); i <= range.max(); i++) {
            if (isInvalidId(i)) {
                invalidId.add(i);
            }
        }

        return invalidId;
    }

    private boolean isInvalidId(long i) {
        String id = i + "";

        int mid = id.length() / 2;

        for (int j = 1; j <= mid; j++) {
            if(isRepeated(id, j)){
                return true;
            }
        }

        return false;
    }

    private boolean isRepeated(String id, int j) {
        if (id.length() % j != 0) {
            return false;
        }

        String firstSubString = id.substring(0, j);
        for (int i = 1; i < id.length() / j; i++) {
            String substring = id.substring(j * i, j * (i + 1));

            if (!firstSubString.equals(substring)) return false;
        }

        return true;
    }
}
