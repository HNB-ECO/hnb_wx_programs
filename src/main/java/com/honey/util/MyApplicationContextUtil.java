package com.honey.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
  
public class MyApplicationContextUtil implements ApplicationContextAware { 
      private static ApplicationContext context;

	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		MyApplicationContextUtil.context=context;
		
	}

public static ApplicationContext getContext() {
	return context;
}

public static void setContext(ApplicationContext context) {
	MyApplicationContextUtil.context = context;
}

}