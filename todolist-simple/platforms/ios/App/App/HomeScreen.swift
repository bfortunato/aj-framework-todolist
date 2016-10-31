//
//  AJHomeScreen.swift
//  AJLibrary
//
//  Created by Bruno Fortunato on 08/03/16.
//  Copyright © 2016 Bruno Fortunato. All rights reserved.
//

import Foundation
import UIKit
import AJ
import ApplicaFramework

class HomeViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    private var _tableView: UITableView?
    private var _label: UILabel?
    
    var todos: AJArray? {
        didSet {
            _tableView?.isHidden = (todos?.count ?? 0) == 0
            _label?.isHidden = (todos?.count ?? 0) > 0
            _tableView?.reloadData()
        }
    }
    
    init() {
        super.init(nibName: nil, bundle: nil)
        
        AJ.subscribe(to: Stores.TODOS, owner: self) { [weak self] (state) in
            self?.todos = state.get("todos")?.array
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    deinit {
        AJ.unsubscribe(from: Stores.TODOS, owner: self)
    }
    
    override func loadView() {
        super.loadView()
        
        view.backgroundColor = Colors.white
        
        _tableView = UITableView(frame: view.bounds, style: .plain)
        _tableView?.dataSource = self
        _tableView?.delegate = self
        _tableView?.isHidden = true
        
        _label = UILabel(frame: CGRect.zero)
        _label?.font = _label!.font.withSize(24)
        _label?.text = "No things to do"
        _label?.sizeToFit()
        _label?.center = view.center
        
        view.addSubview(_tableView!)
        view.addSubview(_label!)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "Todo List"
        
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(title: "ADD", style: .plain, target: self, action: #selector(createTodo))
    }
    
    func createTodo() {
        let alert = UIAlertController(title: "Todo", message: "What you have to do?", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Create", style: .default, handler: { action -> Void in
            if let textField = alert.textFields?.first {
                _ = AJ.run(action: Actions.TODO_CREATE, data: AJObject.create().set("text", textField.text))
            }
        }))
        alert.addTextField(configurationHandler: {(textField: UITextField!) in })
        self.present(alert, animated: true, completion: nil)
    }
    
    //MARK: Table view
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return todos?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let id = todos?.objectAt(indexPath.row)?.get("id")?.int else {
            fatalError()
        }
        
        let complete = todos?.objectAt(indexPath.row)?.get("complete")?.bool ?? false
        _ = AJ.run(action: Actions.TODO_COMPLETE, data: AJObject.create().set("id", id).set("complete", !complete))
        
        _tableView?.deselectRow(at: indexPath, animated: true)
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let kIdentifier = "cell"
        let cell = tableView.dequeueReusableCell(withIdentifier: kIdentifier) ?? UITableViewCell(style: .default, reuseIdentifier: kIdentifier)
        cell.textLabel?.text = todos?.objectAt(indexPath.row)?.get("text")?.string
        cell.textLabel?.font = cell.textLabel!.font.withSize(18)
        let complete = todos?.objectAt(indexPath.row)?.get("complete")?.bool ?? false
        if complete {
            cell.backgroundColor = UIColor(red: 204 / 255, green: 255 / 255, blue: 204 / 255, alpha: 1)
            cell.accessoryType = .checkmark
            cell.textLabel?.textColor = UIColor.gray
        } else {
            cell.backgroundColor = UIColor.white
            cell.accessoryType = .none
            cell.textLabel?.textColor = UIColor.black
        }
        return cell
    }
}
