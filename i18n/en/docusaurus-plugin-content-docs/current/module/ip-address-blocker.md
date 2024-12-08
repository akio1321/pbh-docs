# IP Banning

Since PeerBanHelper implements peer banning by manipulating the IP blacklist of the downloader, it is inevitable that your IP blacklist will be overwritten by PeerBanHelper. Therefore, PeerBanHelper has a built-in separate IP blacklist feature.

It is not recommended to configure this feature through the configuration file; you can directly use the visual editor in the WebUI.

## IPs

IP blacklist, supports entering one or more IP addresses or CIDR addresses. The listed IPs or those included in the CIDR will be banned when connecting to the downloader.

## Ports

Port blacklist, supports entering one or more ports. Any IP using the listed ports to connect to your downloader will be banned.

## ASNs

ASN blacklist. It needs to be used with the Maxmind GeoLite2 ASN database. The ASN database should be downloaded along with the IPDB when PBH starts.  
Supports entering one or more [ASN](https://zh-hans.ipshu.com/asn_list), and any IP addresses within the given ASN will be banned when connecting to your downloader.

## Regions

Country/Region blacklist. You can enter one or more [ISO 3166-1 two-letter country codes](https://www.rr78.com/World/postal/). It needs to be used with the Maxmind GeoLite2 City database. The City database should be downloaded along with the IPDB when PBH starts.  

## Cities

City blacklist. For foreign cities, use the Maxmind city names. For cities recorded in GeoCN (mainland China, some parts of Taiwan, Hong Kong, and Macau), use the standard Simplified Chinese names.  
The matching algorithm is based on the keyword appearing in the name:

* `New York` - Bans New York, USA
* `济南` - Bans Jinan city in any province
* `山东省 济南市` - Bans Jinan city in Shandong province
* `垦利县` - Bans Kenli county in any province or city
* `东营区` - Bans Dongying district in any province or city
* `北京` - Bans Beijing municipality
* `上海` - Bans Shanghai municipality

## Net Type

Network type blacklist. It needs to be used with the GeoCN database. The GeoCN database should be downloaded along with the IPDB when PBH starts.  

If the network type of the IP is recorded in the GeoCN database, you can ban IP addresses corresponding to the network type.

## Configuration File

```yaml
  # IP address/port blacklist
  # IP address/port blacklist
  ip-address-blocker:
    enabled: true
    # Ban duration in milliseconds, use default to follow global settings
    ban-duration: 259200000
    # Banning IP address, supports CIDR, syntax example:
    # Banning IP address, support CIDR, syntax example:
    # ::/64
    # a:b:c:d::a:b/64
    # a:b:c:d:e:f:1.2.3.4/112
    # 1.2.3.4/16
    # 1.2.255.4/255.255.0.0
    ips:
      - "0.0.0.0"
    #- 8.8.8.8
    #- 9.9.9.9
    # Banning ports
    ports:
      - 0
    #- 2003
    # Banning ASN (Require config GeoIP-ASN database)
    asns:
      - "0"
    #  - 0 # Network ASN good
    # Banning as Country/Region code
    regions:
      - "0"
    # Banning as city name
    # Use Maxmind name as default, or use GeoCN name for record exists in GeoCN if GeoCN is loaded
    cities:
      - "示例海南"
    #  - ISO_CODE Enter country/region ISO code, case sensitive, like: CN, UK, TW, HK, JP, etc.
    #  - ISO_CODE Enter the ISO code, case sensitive (E.g. CN, UK, TW, HK, JP, etc.)
    # Banning as net type (only works for China Mainland IPs, Require config GeoIP database)
    net-type:
      # Broadband
      wideband: false
      # Base station
      base-station: false
      # Government and enterprise line
      government-and-enterprise-line: false
      # Business platform
      business-platform: false
      # Backbone network
      backbone-network: false
      # IP private network
      ip-private-network: false
      # Internet cafe
      internet-cafe: false
      # IoT
      iot: false
      # Data center
      datacenter: false
