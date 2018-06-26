package com.xiao.event;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class eventController {

    /**
     *
     */
    @RequestMapping("/001")
    public String index(Model model){
        model.addAttribute("11",111);
        return "001";
    }

}
