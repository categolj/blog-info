import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <h1>Info</h1>
                <Header/>
                <article>
                    <Route exact path="/" component={Prod}/>
                    <Route path="/prod" component={Prod}/>
                    <Route path="/dev" component={Dev}/>
                </article>
            </div>
        </Router>
    );
}

function Prod() {
    return <div>
        <h2>Prod</h2>
        <Info header={'UI'} url={'https://blog.ik.am'}/>
        <Info header={'API'} url={'https://blog-api.ik.am'}/>
    </div>;
}

function Dev() {
    return <div>
        <h2>Dev</h2>
        <Info header={'UI'} url={'https://blog.k8s.bosh.tokyo'}/>
        <Info header={'API'} url={'https://blog-api.k8s.bosh.tokyo'}/>
    </div>;
}

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.url = props.url;
        this.header = props.header;
        this.state = {
            info: {
                build: {
                    version: 'Loading ...'
                },
                maven: {
                    versions: {}
                },
                git: {
                    commit: {
                        id: {}
                    },
                    remote: {
                        origin: {
                            url: ''
                        }
                    }
                }
            }
        };
    }

    componentDidMount() {
        fetch(`${this.url}/actuator/info`)
            .then(result => result.json())
            .then(info => {
                this.setState({
                    info: info
                });
            })
    }

    render() {
        const info = this.state.info;
        const rev = info.git.commit.id.abbrev;
        const header = this.header;
        return (
            <div>
                <h3><a href={this.url}>{header}</a></h3>
                <table>
                    <thead>
                    <tr>
                        <th>Version</th>
                        <td>{info.build.version}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Build Time</th>
                        <td>{info.build.time}</td>
                    </tr>
                    <tr>
                        <th>Source Code</th>
                        <td><a href={info.git.remote.origin.url
                            .replace('git@github.com:', 'https://github.com/')
                            .replace('.git', `/tree/${rev}`)}
                               target={'_blank'}><code>{rev}</code></a></td>
                    </tr>
                    <tr>
                        <th>Spring Framework</th>
                        <td>{info.maven.versions['spring-framework']}</td>
                    </tr>
                    <tr>
                        <th>Spring Boot</th>
                        <td>{info.maven.versions['spring-boot']}</td>
                    </tr>
                    <tr>
                        <th>Spring Cloud</th>
                        <td>{info.maven.versions['spring-cloud']}</td>
                    </tr>
                    </tbody>
                </table>
            </div>);
    }
}

function Header() {
    return (
        <ul>
            <li>
                <Link to="/prod">Prod</Link>
            </li>
            <li>
                <Link to="/dev">Dev</Link>
            </li>
        </ul>
    );
}

export default App;