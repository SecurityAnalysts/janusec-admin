import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export class AuthUser {
    user_id: number;
    username: string;
    passwd: string;
    logged: boolean;
    is_super_admin: boolean;
    is_cert_admin: boolean;
    is_app_admin: boolean;
    need_modify_pwd: boolean;
    totp_key: string;
    totp_verified: boolean;
}

export class AppAdmin {
    id: number;
    username: string;
    password: string;
    email: string;
    is_super_admin: boolean;
    is_cert_admin: boolean;
    is_app_admin: boolean;
    need_modify_pwd: boolean;
}

export class Application {
    id: number;
    name: string;
    internal_scheme: string;  
    redirect_https: boolean;  
    hsts_enabled: boolean;
    waf_enabled: boolean;
    shield_enabled: boolean; 
    destinations: Destination[];	
    domains: Domain[]; 
    ip_method: IPMethod;    
    description: string;
    oauth_required: boolean;
    session_seconds: number;
    owner: string;
    csp_enabled: boolean;
    csp: string;
    cache_enabled: boolean;
}

export class VipApp {
    id: number;
    name: string;
    listen_port: number;
    is_tcp: boolean;
    targets: VipTarget[];
    owner: string;
    description: string;
}

export class VipTarget {
    id: number;
    vip_app_id: number;
    destination: string;
    online: boolean;
    check_time: number;
}

export enum IPMethod {
    REMOTE_ADDR      = 1,
    X_Forwarded_For  = 1 << 1,
	X_REAL_IP        = 1 << 2,
	REAL_IP          = 1 << 3
}

export class Certificate {
    id: number;
    common_name: string;
    cert_content: string;
    priv_key_content: string;
    expire_time: number;    
    description: string;
    due_to_expire: boolean;
}

export enum RouteType {
    Reverse_Proxy =1,
    Local_FastCGI =1 << 1,
    Static_Website = 1 << 2
}

export class Destination {
    id: number;
    route_type: RouteType;
    request_route: string;
    backend_route: string;
    destination: string;
    app_id: number;
    node_id: number;
    online: boolean;
    check_time: number;
}

export class SelfSignCert {
    cert_content: string;
    priv_key_content: string;
}

export class Domain {
    id: number;
    name: string;
    app_id: number;
    cert_id: number;
    redirect: boolean;
    location: string;
}


export interface APIResponse {
    err: string;
    object: any
}

export class CCPolicy {
    app_id: number;
    interval_milliseconds: number;
    max_count: number;
    block_seconds: number;
    action: number;
    stat_by_url: boolean;
    stat_by_ua: boolean;
    stat_by_cookie: boolean;
	is_enabled: boolean;
}

export enum ChkPoint {
	Host                = 1,
	IPAddress           = 1 << 1,
	Method              = 1 << 2,
	URLPath             = 1 << 3,
	URLQuery            = 1 << 4,
    FileExt             = 1 << 5,
	// ValueLength         = 1 << 6,
	GetPostKey          = 1 << 7,
	GetPostValue        = 1 << 8,
	UploadFileExt       = 1 << 9,
    Referer             = 1 << 10,
	CookieKey           = 1 << 11,
	CookieValue         = 1 << 12,
	UserAgent           = 1 << 13,
	ContentType         = 1 << 14,
	HeaderKey           = 1 << 15,
	HeaderValue         = 1 << 16,
	Proto               = 1 << 17,
	ResponseStatusCode  = 1 << 25,
	ResponseHeaderKey   = 1 << 26,
	ResponseHeaderValue = 1 << 27,
	//ResponseBodyLength  = 1 << 28,
	ResponseBody        = 1 << 29
}

export enum PolicyAction {
    BLOCK   = 100,
    BYPASS_AND_LOG  = 200,
    CAPTCHA = 300,
    OK_PASS    = 400
}

export class VulnType {
    id: number;
    name: string;
}

export class GroupPolicy {
    id: number;
    description: string;
    app_id: number;
    vuln_id: number;
    check_items: CheckItem[];
    hit_value: number;
    action: PolicyAction;
	is_enabled: boolean;
	
}

export enum Operation {
    Regex_Match                     = 1,
    Equals_String_Case_Insensitive  = 1 << 1,
    Greater_Than_Integer            = 1 << 2,
    Equals_Integer                  = 1 << 3,
    Length_Greater_Than_Integer     = 1 << 4,
    Regex_Not_Match                 = 1 << 5
}

export class CheckItem {
    id: number;
    check_point: ChkPoint;
    operation: Operation;
	key_name: string;
    regex_policy: string;
    group_policy_id: number;
}

export class RegexMatch {
    pattern: string;
    payload: string;
    matched: boolean;
    preprocess: boolean;
}

export class NodesKey {
    nodes_key: string;
}

export class Node {
    id: number;
    version: string;
    last_ip: string;
    last_req_time: number;
    online: boolean;
}

export class CCLog {
    id: number;
    request_time: number;
    client_ip: string;
    host: string;
    method: string;
    url_path: string;
    url_query: string;
    content_type: string;
    user_agent: string;
    cookies: string;
    raw_request: string;
    action: PolicyAction;
    app_id: number;
}

export class RegexHitLog {
    id: number;
    request_time: number;
    client_ip: string;
    host: string;
    method: string;
    url_path: string;
    url_query: string;
    content_type: string;
    user_agent: string;
    cookies: string;
    raw_request: string;
    action: PolicyAction;
    policy_id: number;
    app_id: number;
}

export class SimpleRegexHitLog {
    id: number;
    request_time: number;
    client_ip: string;
    host: string;
    method: string;
    url_path: string;
    action: PolicyAction;
    policy_id: number;
    app_id: number;
}

export class SimpleCCLog {
    id: number;
    request_time: number;
    client_ip: string;
    host: string;
    method: string;
    url_path: string;
    action: PolicyAction;
    app_id: number;
}

export class RegexHitLogsCount {
    app_id: number;
    start_time: number;
    end_time: number;
    count: number;
}

export class CCLogsCount {
    app_id: number;
    start_time: number;
    end_time: number;
    count: number;
}

export class LastRegexLogs {
    app_id : number;  
    start_date: Date;
    end_date: Date;
    page_index: number;
    length: number;
    regex_logs: SimpleRegexHitLog[]=[];
}

export class LastCCLogs {
    app_id : number;  
    start_date: Date;
    end_date: Date;
    page_index: number;
    length: number;
    cc_logs: SimpleCCLog[]=[];
}

export class VulnStat {
    vuln_id : number;
    count : number;
}

export class Server {
    ip: string;
    port: string;
    username: string;
    password: string;

    constructor(ip:string, port:string, username:string, password:string) { 
        this.ip = ip;
        this.port = port;
        this.username =username;
        this.password = password;
    }  
}

export class OAuthInfo {
    use_oauth: boolean;
    display_name: string;
    entrance_url: string;
    authenticator_enabled: boolean;
}

export class RefererHost {
    host: string;
	PV:   number;
	UV:   number;
}

export class RefererURL {
    url:  string;
    PV:   number;
	UV:   number;
}

export class PopContent {
    app_id: number;
    url_path: string;
    amount: number;
}

export class GateHealth {
    start_time: number;
    cur_time: number;
    version: string;
    cpu_percent: number;
    cpu_load1: number;
    cpu_load5: number;
    cpu_load15: number;
    mem_used: number;
    mem_total: number;
    disk_used: number;
    disk_total: number;
    time_zone: string;
    time_offset: number;
    concurrency: number;
}

export class License {
    edition: string;
    max_users_count: number;
    max_apps_count: number;
    max_concurrency: number;
    expire_time: number;
}

export class SMTPSetting {
    smtp_enabled: boolean;
    smtp_server: string;
    smtp_port: string;
    smtp_account: string;
    smtp_password: string;
}

export class PrimarySetting {
    auth_enabled: boolean;
    auth_provider: string;
    webssh_enabled: boolean;
    waf_log_days: number;
    cc_log_days: number;
    access_log_days: number;
    skip_se_enabled: boolean;
    search_engines: string;
    smtp: SMTPSetting;
}

export class IPPolicy {
    id: number;
    ip_addr: string;
    is_allow: boolean;
    apply_to_waf: boolean;
    apply_to_cc: boolean;
    editable: boolean;
}

export class WxworkConfig {
    display_name: string;
    callback: string;
    corpid: string;
    agentid: string;
    corpsecret: string;
}

export class DingtalkConfig {
    display_name: string;
    callback: string;
    appid: string;
    appsecret: string;
}

export class FeishuConfig {
    display_name: string;
    callback: string;
    appid: string;
    appsecret: string;
}

export class LarkConfig {
    display_name: string;
    callback: string;
    appid: string;
    appsecret: string;
}

export class LDAPConfig {
    display_name: string;
    entrance: string;
    address: string;
    dn: string;
    using_tls: boolean;
    authenticator_enabled: boolean;
    bind_required: boolean;
    base_dn: string;
    bind_username: string;
    bind_password: string;
}

export class CAS2Config {
    display_name: string;
    entrance: string;
    callback: string;
}
