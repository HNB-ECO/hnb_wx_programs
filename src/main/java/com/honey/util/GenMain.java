package com.honey.util;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.exception.InvalidConfigurationException;
import org.mybatis.generator.exception.XMLParserException;
import org.mybatis.generator.internal.DefaultShellCallback;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**************************************
 * @author E-mail:34782655@qq.com
 * @version 创建时间：2018/4/20
 * 类说明:mybatis逆向工程main函数
 ***************************************
 */
public class GenMain {
    public static void main(String[] args) {
        List<String> warnings = new ArrayList<String>();
        boolean overwrite = true;

            String genCfg = "/generatorConfig.xml";
            File configFile = new File(GenMain.class.getResource(genCfg).getFile());
            ConfigurationParser cp = new ConfigurationParser(warnings);
            Configuration config = null;
            try {
                config = cp.parseConfiguration(configFile);
            } catch (IOException e) {
                e.printStackTrace();
            } catch (XMLParserException e) {
                e.printStackTrace();
            }
            DefaultShellCallback callback = new DefaultShellCallback(overwrite);
            MyBatisGenerator myBatisGenerator = null;
            try {
                myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
            } catch (InvalidConfigurationException e) {
                e.printStackTrace();
            }
            try {
            myBatisGenerator.generate(null);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
