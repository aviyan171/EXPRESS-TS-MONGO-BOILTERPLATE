import { CookieOptions, Request, Response } from "express";
import { env } from "@/config/env";
import { toMs } from "./ms";
import { StringValue } from "ms";


export class CookieHelper {
  private readonly name: string;;
  private readonly options: CookieOptions = {
    httpOnly: false,
    secure: false, // Only send over HTTPS in production
    sameSite: 'lax' as const, // Protects against CSRF attacks
    path: '/', // Cookie is available for all paths
  };

  constructor(name: string, options?:CookieOptions) {
    this.name = name
    this.options = { ...this.options, ...options };
  }
  
  setCookie(res: Response, value: string) {
    res.cookie(this.name, value, this.options);
  }

  getCookie(req: Request) {
    return req.cookies[this.name];
  }

  deleteCookie(res: Response) {
    res.clearCookie(this.name);
  }
}



