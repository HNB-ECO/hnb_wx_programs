package com.honey.exception;

import org.quartz.JobExecutionException;

public class ResException extends JobExecutionException {

    /**
     *
     */
    private static final long serialVersionUID = -6279011493559226138L;

    private int errcode;
    private String errmsg;

    public ResException(int errcode, String errmsg) {
        super(errcode + ":" + errmsg);
        this.errcode = errcode;
        this.errmsg = errmsg;
    }

    public int getErrcode() {
        return errcode;
    }

    public void setErrcode(int errcode) {
        this.errcode = errcode;
    }

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }

}
