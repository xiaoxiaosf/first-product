package com.xiao.event;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class eventController2 {

    /**
     *
     */
    @RequestMapping("/001")
    public String index(Model model){
        model.addAttribute("11",111);
        return "001";
    }

    @RequestMapping("/002")
    public String index2(Model model){
        model.addAttribute("22",222);
        return "002";
    }

    @RequestMapping("/003")
    public String index3(Model model){
        model.addAttribute("33",333);
        return "003";
    }

    @RequestMapping("/004")
    public String index4(Model model){
        model.addAttribute("44",444);
        return "004";
    }

}
