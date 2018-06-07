import com.honey.pojo.response.ExpressResult;
import com.honey.util.ExpressUtil;
import net.sf.json.JSONObject;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by ZYL on 2018/5/24.
 */
public class Test {


    public static void main (String[] args){
        ExpressResult result = ExpressUtil.getExpressResult("889890974853711802", null);
        JSONObject json = JSONObject.fromObject(result);//将java对象转换为json对象
        String str = json.toString();
        System.out.println(str);
    }

    public static String[] countMonth(int startMonth, int startYear, int endMonth, int endYear) {

        if ( (endYear < startYear) || (endYear == startYear && endMonth < startMonth) ) {
            return null;
        }

        int yearNum = endYear - startYear;
        int monthNum = endMonth - startMonth + 1;

        if ( monthNum < 0 ) {
            yearNum = yearNum - 1;
        }

        int num = yearNum * 12 + monthNum;
        return countMonth(endMonth, endYear, num);
    }

    public static String[] countMonth(int month, int year, int num) {

        String[] months = new String[num];
        if ( num <= 12 ) {
            for ( int i = 0; i < num; i++ ) {
                int monthNum = month - num + i + 1;
                int yearNum = year;
                if ( monthNum < 1 ) {
                    monthNum = 12 - Math.abs(monthNum);
                    yearNum = yearNum - 1;
                }
                if ( monthNum < 10 ) {
                    months[i] = "0" + String.valueOf(monthNum);
                } else {
                    months[i] = String.valueOf(monthNum);
                }
            }
        }
        return months;
    }

    public  static String[] countYear(int startMonth, int startYear, int endMonth, int endYear) {

        if ( (endYear < startYear) || (endYear == startYear && endMonth < startMonth) ) {
            return null;
        }

        int yearNum = endYear - startYear;
        int monthNum = endMonth - startMonth + 1;

        if ( monthNum < 0 ) {
            yearNum = yearNum - 1;
        }

        int num = yearNum * 12 + monthNum;
        return countYear(endMonth, endYear, num);
    }


    public static String[] countYear(int month, int year, int num) {

        String[] years = new String[num];
        if ( num <= 12 ) {
            for ( int i = 0; i < num; i++ ) {
                int monthNum = month - num + i + 1;
                int yearNum = year;
                if ( monthNum < 1 ) {
                    monthNum = 12 - Math.abs(monthNum);
                    yearNum = yearNum - 1;
                }
                years[i] = String.valueOf(yearNum);
            }
        }
        return years;
    }


    public static void countDateMonth(Date date, int num, String[] dates, String[] dateMonths, String[] dateYear) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, -(num - 1));
        for ( int i = 0; i < num; i++ ) {
            if ( i == 0 ) {
                calendar.add(Calendar.DATE, 0);
            } else {
                calendar.add(Calendar.DATE, 1);
            }

            //日
            StringBuilder day = new StringBuilder();
            if ( calendar.get(Calendar.DATE) < 10 ) {
                day.append("0");
            }
            day.append(calendar.get(Calendar.DATE));
            dates[i] = day.toString();

            //月
            StringBuilder month = new StringBuilder();
            if ( calendar.get(Calendar.MONTH) < 10 ) {
                month.append("0");
            }
            month.append(calendar.get(Calendar.MONTH) + 1);
            dateMonths[i] = month.toString();
            //年
            dateYear[i] = String.valueOf(calendar.get(Calendar.YEAR));
        }
    }
}
