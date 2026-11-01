import { ProjectSystem, PipelineStep, SystemPipeline, TopologyLayer } from "@/types";

export type { ProjectSystem, PipelineStep, SystemPipeline, TopologyLayer };

export interface ProjectCategoryDef {
  id: "all" | "cloud-ai" | "cisco-networking";
  label: string;
}

export const PROJECT_CATEGORIES: ProjectCategoryDef[] = [
  { id: "all", label: "ALL SYSTEMS" },
  { id: "cloud-ai", label: "AWS & SERVERLESS CLOUD" },
  { id: "cisco-networking", label: "CISCO NETWORKING" },
];

export const PROJECTS_DATA: ProjectSystem[] = [
  {
    id: "court-edge",
    title: "CourtEdge: Automated NBA Intelligence & Probabilistic Projections Pipeline",
    subtitle:
      "Serverless Event-Driven Cloud Pipeline for High-Throughput Sports Analytics & AI Reasoning",
    category: "cloud-ai",
    categoryLabel: "AWS & Serverless Cloud",
    role: "Cloud & Data Systems Architect",
    status: "PRODUCTION",
    stack: [
      "AWS Lambda (Python 3.14)",
      "Amazon Bedrock (Claude 3 Opus)",
      "Amazon DynamoDB",
      "Amazon EventBridge",
      "Amazon S3",
      "Discord Webhooks",
    ],
    metrics: [
      { label: "Runtime Architecture", value: "Serverless Pay-Per-Request" },
      { label: "Execution Model", value: "Event-Driven Microservices" },
      { label: "Foundation Model", value: "Bedrock Claude 3 Opus" },
      { label: "State Persistence", value: "Single-Digit Millisecond DynamoDB" },
    ],
    pipelines: [
      {
        id: "pipeline-a",
        name: "Pipeline A: Pre-Game Generation",
        trigger: "Amazon EventBridge Cron (Daily 10:00 AM EST)",
        objective:
          "Ingest real-time matchups, compute historical baseline distributions, invoke Claude 3 Opus for probabilistic projections, and deliver VIP intelligence briefs.",
        steps: [
          {
            id: "step-a1",
            stepNumber: "01",
            title: "Matchup & Roster Telemetry Ingestion",
            service: "Amazon EventBridge & AWS Lambda",
            description:
              "EventBridge cron schedule triggers execution. Lambda invokes ESPN hidden JSON endpoints via concurrent async requests to gather active lineups, injury statuses, pace ratings, and betting lines.",
            detailCode: `async def get_espn_nba_data(date_str: str) -> dict:
    async with aiohttp.ClientSession() as session:
        # Concurrently fetch live scoreboard, odds, and injury reports
        tasks = [
            fetch_scoreboard(session, date_str),
            fetch_injuries(session),
            fetch_vegas_odds(session, date_str)
        ]
        results = await asyncio.gather(*tasks, return_exceptions=False)
        return parse_matchup_payload(results)`,
            securityControl: "AWS IAM Least-Privilege Role + VPC Private Subnet Outbound NAT",
            runtimeLogic: "Async HTTP Pooling / 300ms Concurrency Timeout",
          },
          {
            id: "step-a2",
            stepNumber: "02",
            title: "Statistical Feature Synthesis & Vectorization",
            service: "AWS Lambda (Python 3.14)",
            description:
              "Normalizes raw statistics into contextual feature sets: offensive/defensive ratings, referee assignment tendencies, back-to-back rest fatigue factors, and opponent defensive matchup ratings.",
            detailCode: `def process_and_format_csv(raw_data: dict) -> str:
    # Compute rest differential, true shooting % and opponent pace
    metrics = compute_advanced_analytics(raw_data)
    matrix = generate_standardized_feature_vector(metrics)
    csv_buffer = serialize_to_tabular_prompt(matrix)
    return csv_buffer`,
            securityControl: "Stateless In-Memory Processing / Ephemeral /tmp Scrubbing",
            runtimeLogic: "Vectorized Pandas Operations / 256MB RAM Profile",
          },
          {
            id: "step-a3",
            stepNumber: "03",
            title: "Mathematical Probabilistic AI Reasoning",
            service: "Amazon Bedrock (Claude 3 Opus)",
            description:
              "Boto3 invokes Bedrock Anthropic Claude 3 Opus via structured JSON system prompts to calculate Bayesian win probabilities, spread confidence intervals, and player prop values with strict mathematical boundaries.",
            detailCode: `response = bedrock_runtime.invoke_model(
    modelId="anthropic.claude-3-opus-20240229-v1:0",
    contentType="application/json",
    accept="application/json",
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 2048,
        "temperature": 0.1,  # Near-zero for deterministic math reasoning
        "system": "You are a quantitative sports analyst...",
        "messages": [{"role": "user", "content": prompt_payload}]
    })
)`,
            securityControl: "Bedrock Guardrails + AWS KMS Customer Managed Keys (CMK)",
            runtimeLogic: "Anthropic Claude 3 Opus Inference / Zero Data Retention",
          },
          {
            id: "step-a4",
            stepNumber: "04",
            title: "Immutable State & Snapshot Persistence",
            service: "Amazon DynamoDB",
            description:
              "Stores immutable projection snapshots, model reasoning tokens, and expected values in a single-digit millisecond latency DynamoDB table with composite partition key GameDate and sort key GameId.",
            detailCode: `dynamodb_client.put_item(
    TableName="CourtEdgeProjections",
    Item={
        "GameDate": {"S": today_date},
        "GameId": {"S": f"NBA_{matchup_id}"},
        "Projections": {"S": json.dumps(projection_data)},
        "ConfidenceScore": {"N": str(confidence_score)},
        "CreatedTimestamp": {"N": str(int(time.time()))},
        "Status": {"S": "PENDING_RESOLUTION"}
    }
)`,
            securityControl: "DynamoDB Encryption at Rest (KMS) + Point-in-Time Recovery",
            runtimeLogic: "On-Demand Capacity Mode / Sub-5ms Write Latency",
          },
          {
            id: "step-a5",
            stepNumber: "05",
            title: "VIP Channel Dispatch & S3 Audit Archive",
            service: "Discord Webhooks & Amazon S3",
            description:
              "Dispatches high-fidelity formatted intelligence embeds to authenticated VIP Discord channels, while streaming the complete raw CSV projection log to Amazon S3 for public tamper-evident auditing.",
            detailCode: `def dispatch_intelligence_brief(embed_payload: dict, audit_csv: str):
    # Dispatch rich markdown embeds to community Discord channel
    requests.post(DISCORD_VIP_WEBHOOK, json=embed_payload, timeout=5)
    # Persist transparency audit snapshot to immutable S3 bucket
    s3_client.put_object(
        Bucket="courtedge-audit-archive",
        Key=f"projections/{today_date}/audit_log.csv",
        Body=audit_csv.encode("utf-8")
    )`,
            securityControl: "Encrypted Webhook Secrets via AWS SSM Parameter Store",
            runtimeLogic: "S3 Standard Storage with Object Lock Legal Hold",
          },
        ],
      },
      {
        id: "pipeline-b",
        name: "Pipeline B: Post-Game Resolution",
        trigger: "Amazon EventBridge Cron (Daily 02:00 AM EST)",
        objective:
          "Fetch official boxscore outcomes, pair against pre-game projections from DynamoDB, calculate mathematical calibration metrics (Brier score & MAE), and publish transparency report cards.",
        steps: [
          {
            id: "step-b1",
            stepNumber: "01",
            title: "Official Final Boxscore Reconciliation",
            service: "EventBridge & AWS Lambda",
            description:
              "Post-midnight cron triggers resolution Lambda. Pulls verified final boxscores, player minutes, shooting percentages, and margin differentials from official NBA statistics APIs.",
            detailCode: `def reconcile_final_scores(game_date: str) -> list[dict]:
    completed_games = espn_client.get_completed_scoreboard(game_date)
    return [
        {
            "game_id": g["id"],
            "winner": g["winner_team"],
            "margin": abs(g["home_score"] - g["away_score"]),
            "player_box": parse_player_stats(g["boxscore"])
        }
        for g in completed_games
    ]`,
            securityControl: "HMAC Signed API Requests + Exponential Backoff Retry",
            runtimeLogic: "Deterministic Data Scraping & Reconciliation",
          },
          {
            id: "step-b2",
            stepNumber: "02",
            title: "Pre-Game Ledger Query & Pairing",
            service: "Amazon DynamoDB",
            description:
              "Retrieves the pre-game projection snapshots generated during Pipeline A using partition key lookups to pair against verified actual outcomes.",
            detailCode: `response = dynamodb_table.query(
    KeyConditionExpression=Key("GameDate").eq(game_date),
    ProjectionExpression="GameId, Projections, ConfidenceScore, Status"
)
pregame_ledger = {item["GameId"]: item for item in response["Items"]}`,
            securityControl: "Read-Only IAM Policy Restricted to Projection Table",
            runtimeLogic: "Single Query Batch Fetch / <10ms Retrieval",
          },
          {
            id: "step-b3",
            stepNumber: "03",
            title: "Algorithmic Calibration & Brier Scoring",
            service: "AWS Lambda (Python 3.14)",
            description:
              "Calculates Brier calibration scores, Mean Absolute Error (MAE), and win-loss margins. Validates model confidence calibration against real variance.",
            detailCode: `def compute_calibration_metrics(predicted_prob: float, actual_win: int):
    # Strict mathematical Brier score calculation (0.0 = perfect accuracy)
    brier_score = (predicted_prob - actual_win) ** 2
    return {
        "brier_score": round(brier_score, 4),
        "outcome": "WIN" if actual_win == 1 else "LOSS"
    }`,
            securityControl: "Isolated Math Computation without External Dependencies",
            runtimeLogic: "NumPy Micro-Benchmark Matrix Processing",
          },
          {
            id: "step-b4",
            stepNumber: "04",
            title: "Ledger State Resolution & Outcome Locking",
            service: "Amazon DynamoDB",
            description:
              "Updates projection records with finalized outcome statuses: RESOLVED_WIN, RESOLVED_LOSS, or RESOLVED_PUSH, locking performance indices for life.",
            detailCode: `dynamodb_client.update_item(
    TableName="CourtEdgeProjections",
    Key={"GameDate": {"S": game_date}, "GameId": {"S": game_id}},
    UpdateExpression="SET #s = :status, BrierDelta = :brier, ErrorMargin = :err",
    ExpressionAttributeNames={"#s": "Status"},
    ExpressionAttributeValues={
        ":status": {"S": outcome_status},
        ":brier": {"N": str(brier_score)},
        ":err": {"N": str(abs_error)}
    }
)`,
            securityControl: "ConditionExpression Verification Preventing Duplicate Resolution",
            runtimeLogic: "Atomic Write Transaction",
          },
          {
            id: "step-b5",
            stepNumber: "05",
            title: "Public Transparency Report Dispatch",
            service: "Discord Webhook & Public S3 Feed",
            description:
              "Publishes daily audited transparency report cards with hit-rate percentages and historical ROI tracking to public community channels and open S3 CSV archives.",
            detailCode: `def publish_audit_report(daily_metrics: dict, audit_csv_path: str):
    # Dispatch transparency embed to public Discord channel
    requests.post(DISCORD_PUBLIC_AUDIT_URL, json=daily_metrics["embed"])
    # Upload machine-readable JSON & CSV to public S3 bucket
    s3.upload_file(audit_csv_path, "courtedge-public-audits", f"{game_date}.csv")`,
            securityControl: "Public Read-Only S3 Bucket Policy with CORS Restriction",
            runtimeLogic: "Instant Automated Community Audit Broadcast",
          },
        ],
      },
    ],
    keyHighlights: [
      "Fully serverless pay-per-request architecture with zero idle compute costs",
      "Asynchronous high-concurrency ingestion from real-time sports telemetry",
      "Anthropic Claude 3 Opus via Amazon Bedrock for probabilistic simulation",
      "Single-digit millisecond latency state persistence with Amazon DynamoDB",
      "Automated post-game reconciliation with Brier score calibration audits",
    ],
  },
  {
    id: "enterprise-campus-network",
    title: "Enterprise Campus Network: Multi-VLAN Segmentation & OSPF Routing",
    subtitle:
      "Resilient 3-Tier Hierarchical Switching Infrastructure with Redundant Routing & First-Hop Redundancy",
    category: "cisco-networking",
    categoryLabel: "Cisco Networking",
    role: "Network Infrastructure Engineer",
    status: "LAB_TOPOLOGY",
    stack: [
      "Cisco Packet Tracer",
      "Cisco Catalyst 3560 / 2960",
      "OSPFv2 (Area 0)",
      "HSRP (RFC 2281)",
      "802.1Q VLANs",
      "PVST+ (802.1D)",
    ],
    metrics: [
      { label: "Campus Hierarchy", value: "3-Tier (Core, Dist, Access)" },
      { label: "IGP Routing", value: "OSPFv2 Single-Area Backbone" },
      { label: "Gateway Redundancy", value: "HSRP Active/Standby Pair" },
      { label: "L2 Switching", value: "802.1Q Trunking & LACP EtherChannel" },
    ],
    topologyLayers: [
      {
        layer: "CORE LAYER",
        devices: "2x Cisco Catalyst 3560 Multilayer Switches",
        protocols: "OSPFv2 Area 0, ECMP Routing, 10Gbps Fiber Interlinks",
        details:
          "High-speed non-blocking backbone interconnecting distribution blocks. Runs point-to-point /30 routed transit links with rapid OSPF convergence and sub-second failover across redundant paths.",
        configSnippet: `router ospf 1
 router-id 1.1.1.1
 log-adjacency-changes
 passive-interface default
 no passive-interface GigabitEthernet0/1
 no passive-interface GigabitEthernet0/2
 network 10.0.0.0 0.0.0.3 area 0
 network 10.0.0.4 0.0.0.3 area 0`,
      },
      {
        layer: "DISTRIBUTION LAYER",
        devices: "2x Cisco Catalyst 3560 Multilayer Switches",
        protocols: "HSRP (Virtual IP 192.168.x.1), Inter-VLAN SVI Routing, LACP EtherChannel",
        details:
          "Provides policy-based routing, access control enforcement, and default gateway redundancy via HSRP priority preemption (Priority 110 Active / 100 Standby). Implements Layer 3 SVIs for high-speed inter-VLAN routing.",
        configSnippet: `interface Vlan10
 ip address 192.168.10.2 255.255.255.0
 standby 10 ip 192.168.10.1
 standby 10 priority 110
 standby 10 preempt
 standby 10 authentication md5 key-string CISCO_SECURE`,
      },
      {
        layer: "ACCESS LAYER",
        devices: "4x Cisco Catalyst 2960 Switches",
        protocols: "802.1Q Trunking, PVST+, Port Security (Sticky MAC), BPDU Guard",
        details:
          "Connects end-user workstations, IP phones, and enterprise APs. Segregates traffic across VLAN 10 (Admin), VLAN 20 (Engineering), VLAN 30 (Guest), and VLAN 99 (Management). Hardened with Port Security and BPDU Guard.",
        configSnippet: `interface range FastEthernet0/1 - 24
 switchport mode access
 switchport access vlan 20
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 spanning-tree bpduguard enable`,
      },
    ],
    keyHighlights: [
      "Strict 3-Tier Campus Design (Core, Distribution, Access) eliminating broadcast loops",
      "Hot Standby Router Protocol (HSRP) ensuring seamless gateway failover without packet drops",
      "802.1Q encapsulation with LACP Port-Channels aggregating distribution switch links",
      "Layer 2 security hardening: Port Security, DHCP Snooping, Dynamic ARP Inspection (DAI)",
      "Rapid Spanning Tree Protocol (PVST+) root bridge deterministic placement",
    ],
  },
  {
    id: "dual-homed-wan-edge",
    title: "Dual-Homed Enterprise WAN Edge & Perimeter Firewall DMZ",
    subtitle:
      "Carrier-Redundant Perimeter Architecture with BGP Multihoming, State-Inspection DMZ & Site-to-Site IPsec",
    category: "cisco-networking",
    categoryLabel: "Cisco Networking",
    role: "Security & Network Architect",
    status: "LAB_TOPOLOGY",
    stack: [
      "Cisco IOS 2911 Routers",
      "Cisco ASA 5506-X Firewall",
      "eBGP (Dual ISP Multihoming)",
      "IPsec Crypto Site-to-Site VPN",
      "Dynamic NAT / PAT",
      "ACL Inspection",
    ],
    metrics: [
      { label: "WAN Peering", value: "eBGP Dual-ISP Multi-homed" },
      { label: "Perimeter Defense", value: "Cisco ASA Stateful Inspection" },
      { label: "Encryption Standard", value: "IPsec AES-256 Tunneling" },
      { label: "Address Translation", value: "Public /29 IPv4 Dynamic PAT" },
    ],
    topologyLayers: [
      {
        layer: "WAN EDGE / PEERING",
        devices: "Dual Cisco 2911 Edge Routers (ISP-A & ISP-B)",
        protocols: "eBGP Peering, BGP Local Preference, AS-Path Prepending",
        details:
          "Dual-carrier upstream WAN connectivity. Implements BGP multihoming with outbound traffic preference via ISP-A (Local-Pref 200) and automated failover path via ISP-B.",
        configSnippet: `router bgp 65001
 neighbor 203.0.113.1 remote-as 64512
 neighbor 203.0.113.1 description PRIMARY_ISP_A
 neighbor 203.0.113.1 route-map PREFER_ISP_A in
!
route-map PREFER_ISP_A permit 10
 set local-preference 200`,
      },
      {
        layer: "PERIMETER DMZ",
        devices: "Cisco ASA 5506-X Security Appliance",
        protocols: "Security Levels (Inside 100, DMZ 50, Outside 0), Inspection Policy",
        details:
          "Triple-interface firewall isolation. Hosts public DNS and web servers in isolated DMZ subnet (172.16.50.0/24), prohibiting inbound connections to the internal corporate LAN.",
        configSnippet: `interface GigabitEthernet1/1
 nameif inside
 security-level 100
 ip address 10.10.10.1 255.255.255.0
!
interface GigabitEthernet1/2
 nameif dmz
 security-level 50
 ip address 172.16.50.1 255.255.255.0`,
      },
      {
        layer: "VPN & ENCRYPTION",
        devices: "Cisco IOS Cryptographic Engine",
        protocols: "IKEv2 / IPsec Phase 1 & 2, AES-256-GCM, SHA-256, Diffie-Hellman Group 14",
        details:
          "Creates zero-trust site-to-site encrypted tunnel backhauling branch office telemetry securely over untrusted public transit with auto-renegotiation.",
        configSnippet: `crypto ipsec transform-set AES_SHA esp-aes 256 esp-sha-hmac
 mode tunnel
!
crypto map VPN_MAP 10 ipsec-isakmp
 set peer 198.51.100.2
 set transform-set AES_SHA
 match address 105`,
      },
    ],
    keyHighlights: [
      "Carrier-redundant BGP multihoming preventing single-point ISP outage failures",
      "Isolated 3-tier security zone perimeter: High (Inside), Medium (DMZ), Low (Outside)",
      "Military-grade AES-256 Site-to-Site IPsec VPN securing remote facility interconnects",
      "Stateful packet inspection with granular reflexive Access Control Lists (ACLs)",
      "Overloaded Port Address Translation (PAT) optimizing public IPv4 address space",
    ],
  },
];
